import React, { useCallback, useEffect, useState } from 'react';
import { Animated, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
// styles
import { common, DefaultContainer } from '../../common/common.styles';
import { ChatBlock, ChatBlockContainer, ChatText } from './Chat.styles';
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
// graphql
import { GET_MESSAGES_BY_GROUP_ID } from './gql/Chat.queries';
import { GET_USER_CHATS } from '../Chats/gql/Chats.queries';
// helpers
import {
  getKeyboardVerticalOffsetForMessages,
  keyboardBehaviorDependsOnPlatformForAddTag,
} from '../../config/platform';

const Chat: React.FC<TChat> = ({ currentUser, loading, messages, addMessage, setReadBy }) => {
  const [message, setMessage] = useState('');
  const [sound, setSound] = useState<Audio.Sound>();
  const { params } = useRoute<NAppNavigatorRouteProp<'Chat'>>();
  const { setOptions } = useNavigation();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../../assets/SendSound/sendSound.wav'));
    setSound(sound);
    await sound.playAsync();
  }

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

  const renderItem = useCallback(({ item }: { item: Messages }) => {
    return (
      <ChatBlockContainer isMyMessage={item.userSentId === currentUser._id}>
        <ChatBlock isMyMessage={item.userSentId === currentUser._id}>
          <ChatText>{item.body}</ChatText>
        </ChatBlock>
      </ChatBlockContainer>
    );
  }, []);

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
      </KeyboardAvoidingView>
    </DefaultContainer>
  );
};

export default Chat;
