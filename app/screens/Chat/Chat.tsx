import React, { useCallback, useEffect, useState } from 'react';
import { Animated, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
// helpers
import {
  getKeyboardVerticalOffsetForMessages,
  keyboardBehaviorDependsOnPlatformForAddTag,
} from '../../config/platform';

const Chat: React.FC<TChat> = ({ currentUser, loading, messages, addMessage }) => {
  const [message, setMessage] = useState('');
  const { params } = useRoute<NAppNavigatorRouteProp<'Chat'>>();
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      title: params.conversationUser,
    });
  }, []);

  const onMessageSend = useCallback(async () => {
    await addMessage({
      variables: {
        body: message,
        userSentId: currentUser._id,
        groupId: params.chatId,
      },
      refetchQueries: [{ query: GET_MESSAGES_BY_GROUP_ID, variables: { groupId: params.chatId } }],
    }).then(() => setMessage(''));
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
