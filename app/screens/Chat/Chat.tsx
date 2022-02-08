import React from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DefaultContainer } from '../../common/common.styles';
import { NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';

const Chat = () => {
  const { params } = useRoute<NAppNavigatorRouteProp<'Chat'>>();

  return (
    <DefaultContainer>
      <Text>{params.chatId}</Text>
      <Text>{params.conversationUser}</Text>
      <Text>{params.conversationUserImage}</Text>
    </DefaultContainer>
  );
};

export default Chat;
