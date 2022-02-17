import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Flow } from 'react-native-animated-spinkit';
import * as Clipboard from 'expo-clipboard';
// styles
import { common, DefaultContainer } from '../../common/common.styles';
import {
  ChatBlock,
  ChatBlockContainer,
  ChatText,
  OptionsBlock,
  OptionsButton,
  OptionsDivider,
  OptionsText,
  ReplyBlock,
  ReplyText,
} from './Chat.styles';
// types
import { NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';
import { TChat } from './Chat.types';
import { Messages } from '../../types/graphql';
// components
import Spinner from '../../components/Spinner/Spinner';
import ChatHeader from './components/ChatHeader/ChatHeader';
import GrayInput from '../../components/GrayInput/GrayInput';
// constants
import { colors } from '../../config/colors';
import { messages as messagesConstants } from '../../config/messages';
// graphql
import { GET_MESSAGES_BY_GROUP_ID } from './gql/Chat.queries';
import { GET_USER_CHATS } from '../../gql/chat/chat.queries';
// helpers
import {
  getKeyboardVerticalOffsetForMessages,
  keyboardBehaviorDependsOnPlatformForAddTag,
} from '../../config/platform';

const Chat: React.FC<TChat> = ({
  currentUser,
  loading,
  messages,
  addMessage,
  setReadBy,
  deleteMessage,
  updateTypingUsers,
  typingUsers = [],
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isReplyMessage, setIsReplyMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [selectedMessageBody, setSelectedMessageBody] = useState('');
  const [selectedMessageSenderId, setSelectedMessageSenderId] = useState('');
  const [message, setMessage] = useState('');
  const [sound, setSound] = useState<Audio.Sound>();
  const { params } = useRoute<NAppNavigatorRouteProp<'Chat'>>();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/SendSound/sendSound.wav'));
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync().then(() => console.log('Uploaded sound'));
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (messages[0]?._id) {
      (async () => {
        await setReadBy({
          variables: {
            userId: currentUser._id,
            messageId: messages[0]._id,
          },
          refetchQueries: [
            { query: GET_MESSAGES_BY_GROUP_ID, variables: { groupId: params.chatId } },
            { query: GET_USER_CHATS, variables: { userId: currentUser._id } },
            { query: GET_USER_CHATS, variables: { userId: params.userId } },
          ],
        });
      })();
    }
  }, [params, setReadBy, currentUser, messages]);

  useEffect(() => {
    if (!typingUsers.includes(currentUser._id) && isFocus) {
      (async () => {
        await updateTypingUsers({
          variables: {
            chatId: params.chatId,
            newArray: [...typingUsers, currentUser._id],
          },
        });
      })();
    } else if (typingUsers.length === 1 && typingUsers.includes(currentUser._id) && !isFocus) {
      (async () => {
        await updateTypingUsers({
          variables: {
            chatId: params.chatId,
            newArray: [],
          },
        });
      })();
    } else if (typingUsers.length === 2 && !isFocus) {
      (async () => {
        await updateTypingUsers({
          variables: {
            chatId: params.chatId,
            newArray: typingUsers.filter(t => t !== currentUser._id),
          },
        });
      })();
    }
  }, [isFocus]);

  const onMessageSend = useCallback(async () => {
    await addMessage({
      variables: {
        body: message,
        userSentId: currentUser._id,
        groupId: params.chatId,
        reply: selectedMessageBody,
      },
      refetchQueries: [
        { query: GET_MESSAGES_BY_GROUP_ID, variables: { groupId: params.chatId } },
        { query: GET_USER_CHATS, variables: { userId: currentUser._id } },
        { query: GET_USER_CHATS, variables: { userId: params.userId } },
      ],
    }).then(() => {
      playSound();
      setMessage('');
      setIsReplyMessage(false);
    });

    await updateTypingUsers({
      variables: {
        chatId: params.chatId,
        newArray: [],
      },
    });
  }, [message, currentUser, params, setMessage, updateTypingUsers]);

  const onDeleteMessage = useCallback(async () => {
    await deleteMessage({
      variables: {
        messageId: selectedMessage,
        refetchQueries: [
          { query: GET_MESSAGES_BY_GROUP_ID, variables: { groupId: params.chatId } },
          { query: GET_USER_CHATS, variables: { userId: currentUser._id } },
          { query: GET_USER_CHATS, variables: { userId: params.userId } },
        ],
      },
    }).then(() => setIsEditMode(false));
  }, [selectedMessage, deleteMessage, params, currentUser, setIsEditMode]);

  const onCopy = useCallback(() => {
    Clipboard.setString(selectedMessageBody);
    setIsEditMode(false);
  }, [selectedMessageBody]);

  const renderItem = useCallback(
    ({ item }: { item: Messages }) => {
      const isMyMessage = item.userSentId === currentUser._id;
      return (
        <ChatBlockContainer isMyMessage={isMyMessage}>
          {item?.reply && (
            <ReplyBlock>
              <ReplyText>{item.reply}</ReplyText>
            </ReplyBlock>
          )}
          <ChatBlock
            onLongPress={() => {
              setIsEditMode(true);
              setSelectedMessage(item._id);
              setSelectedMessageBody(item.body);
              setSelectedMessageSenderId(item.userSentId);
            }}
            activeOpacity={1}
            isMyMessage={isMyMessage}
            isEditMode={item._id === selectedMessage ? isEditMode : false}>
            <ChatText>{item.body}</ChatText>
          </ChatBlock>
        </ChatBlockContainer>
      );
    },
    [setIsEditMode, isEditMode, currentUser, selectedMessage, setSelectedMessage],
  );

  const renderInput = useCallback(() => {
    return (
      <GrayInput
        comment={message}
        setComment={setMessage}
        currentUser={currentUser}
        setIsFocus={setIsFocus}
        isMessagesInput
        rightElement={
          <TouchableOpacity disabled={message === ''} onPress={onMessageSend}>
            <MaterialCommunityIcons
              name="send-circle"
              size={25}
              color={message === '' ? colors.gray1 : colors.purple}
            />
          </TouchableOpacity>
        }
        replyMessage={isReplyMessage && selectedMessageBody}
        setIsReplyMessage={setIsReplyMessage}
      />
    );
  }, [message, setMessage, currentUser, onMessageSend, isReplyMessage, selectedMessageBody, setIsReplyMessage]);

  const renderOptions = useCallback(() => {
    return (
      <>
        <OptionsDivider />
        <OptionsBlock>
          {selectedMessageSenderId === currentUser._id && (
            <OptionsButton onPress={onDeleteMessage}>
              <OptionsText>{messagesConstants.unsent}</OptionsText>
            </OptionsButton>
          )}

          <OptionsButton isOtherOptions onPress={onCopy}>
            <OptionsText isOtherOptions>{messagesConstants.copy}</OptionsText>
          </OptionsButton>

          <OptionsButton
            isOtherOptions
            onPress={() => {
              setIsReplyMessage(true);
              setIsEditMode(false);
            }}>
            <OptionsText isOtherOptions>{messagesConstants.reply}</OptionsText>
          </OptionsButton>

          <OptionsButton isCloseOptions onPress={() => setIsEditMode(false)}>
            <OptionsText isCloseOptions>{messagesConstants.closeOptions}</OptionsText>
          </OptionsButton>
        </OptionsBlock>
      </>
    );
  }, [isEditMode, onDeleteMessage, currentUser, selectedMessageSenderId, onCopy, setIsEditMode, setIsReplyMessage]);

  const keyExtractor = (item: Messages) => item._id;
  const keyboardVerticalOffset = getKeyboardVerticalOffsetForMessages();

  const isTypingAnotherUser = useMemo(() => typingUsers.filter(t => t !== currentUser._id), [typingUsers, currentUser]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <DefaultContainer>
      <KeyboardAvoidingView
        style={common.keyboard}
        behavior={keyboardBehaviorDependsOnPlatformForAddTag}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ChatHeader userName={params.conversationUser} img={params.conversationUserImage} userId={params.userId} />
        <Animated.FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          inverted
          keyboardShouldPersistTaps={'handled'}
          onTouchEnd={() => setIsFocus(false)}
        />

        {isTypingAnotherUser[0] && (
          <ChatBlockContainer isMyMessage={false}>
            <ChatBlock disabled={true} activeOpacity={1} isMyMessage={false} isEditMode={false}>
              <Flow size={32} color={colors.pink} />
            </ChatBlock>
          </ChatBlockContainer>
        )}

        {isEditMode ? renderOptions() : renderInput()}
      </KeyboardAvoidingView>
    </DefaultContainer>
  );
};

export default Chat;
