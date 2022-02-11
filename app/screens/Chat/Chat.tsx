import React, { useCallback, useEffect, useState } from 'react';
import { Animated, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
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
import { GET_USER_CHATS } from '../Chats/gql/Chats.queries';
// helpers
import {
  getKeyboardVerticalOffsetForMessages,
  keyboardBehaviorDependsOnPlatformForAddTag,
} from '../../config/platform';

const Chat: React.FC<TChat> = ({ currentUser, loading, messages, addMessage, setReadBy, deleteMessage }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [message, setMessage] = useState('');
  const [sound, setSound] = useState<Audio.Sound>();
  const { params } = useRoute<NAppNavigatorRouteProp<'Chat'>>();
  const { setOptions } = useNavigation();

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
    setOptions({
      title: params.conversationUser,
    });

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

  const onMessageSend = useCallback(async () => {
    await addMessage({
      variables: {
        body: message,
        userSentId: currentUser._id,
        groupId: params.chatId,
      },
      refetchQueries: [
        { query: GET_MESSAGES_BY_GROUP_ID, variables: { groupId: params.chatId } },
        { query: GET_USER_CHATS, variables: { userId: currentUser._id } },
        { query: GET_USER_CHATS, variables: { userId: params.userId } },
      ],
    }).then(() => {
      playSound();
      setMessage('');
    });
  }, [message]);

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

  const renderItem = useCallback(
    ({ item }: { item: Messages }) => {
      const isMyMessage = item.userSentId === currentUser._id;
      return (
        <ChatBlockContainer isMyMessage={isMyMessage}>
          <ChatBlock
            onLongPress={() => {
              setIsEditMode(true);
              setSelectedMessage(item._id);
            }}
            disabled={!isMyMessage}
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
      />
    );
  }, [message, setMessage, currentUser, onMessageSend]);

  const renderOptions = useCallback(() => {
    return (
      <>
        <OptionsDivider />
        <OptionsBlock>
          <OptionsButton onPress={onDeleteMessage}>
            <OptionsText>{messagesConstants.unsent}</OptionsText>
          </OptionsButton>

          <OptionsButton isCloseOptions onPress={() => setIsEditMode(false)}>
            <OptionsText isCloseOptions>{messagesConstants.closeOptions}</OptionsText>
          </OptionsButton>
        </OptionsBlock>
      </>
    );
  }, [isEditMode, onDeleteMessage]);

  const keyExtractor = (item: Messages) => item._id;
  const keyboardVerticalOffset = getKeyboardVerticalOffsetForMessages();

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
        <Animated.FlatList data={messages} renderItem={renderItem} keyExtractor={keyExtractor} inverted />
        <ChatBlockContainer isMyMessage={false}>
          <OptionsButton>
            <OptionsText>{messagesConstants.unsent}</OptionsText>
          </OptionsButton>
        </ChatBlockContainer>
        {isEditMode ? renderOptions() : renderInput()}
      </KeyboardAvoidingView>
    </DefaultContainer>
  );
};

export default Chat;
