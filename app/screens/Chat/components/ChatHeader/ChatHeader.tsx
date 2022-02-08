import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { ChatHeaderBlock, LeftSide, s, UserNameText } from './ChatHeader.styles';
import { colors } from '../../../../config/colors';
import UserImage from '../../../../components/UserImage/UserImage';
import { NAppNavigatorNavigationProp } from '../../../../navigation/types/AppNavigator.types';
import { screens } from '../../../../config/screens';
import { GET_USER } from '../../../../gql/user/user.queries';

const ChatHeader = ({ userName, img, userId }: { userName: string; img: string; userId: string }) => {
  const { goBack, navigate } = useNavigation<NAppNavigatorNavigationProp<'UserProfile'>>();

  const { data } = useQuery(GET_USER, { variables: { userId } });

  return (
    <ChatHeaderBlock>
      <LeftSide>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="ios-chevron-back" size={30} color={colors.white} style={s.backImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate(screens.UserProfile, { user: data?.getUser })}>
          <LeftSide>
            <UserImage styles={s.img} uri={img} />
            <UserNameText>{userName}</UserNameText>
          </LeftSide>
        </TouchableOpacity>
      </LeftSide>

      <View>
        <Ionicons name="settings-outline" size={25} color={colors.white} />
      </View>
    </ChatHeaderBlock>
  );
};

export default ChatHeader;
