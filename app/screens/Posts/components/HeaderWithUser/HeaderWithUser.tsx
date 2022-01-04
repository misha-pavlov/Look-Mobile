import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { HeaderWithUserBlock, HeaderWithUserTouchable, s, UserNameText } from './HeaderWithUser.styles';
import { colors } from '../../../../config/colors';
import { withCurrentUser } from '../../../../hocs/withCurrentUser';
import { screens } from '../../../../config/screens';
import { NAppNavigatorNavigationProp } from '../../../../navigation/types/AppNavigator.types';
import { User } from '../../../../types/graphql';
import { common } from '../../../../common/common.styles';

const HeaderWithUser = (currentUser: { currentUser?: User }) => {
  const { navigate } = useNavigation<NAppNavigatorNavigationProp<'UserProfile'>>();

  return (
    <HeaderWithUserBlock>
      <HeaderWithUserTouchable onPress={() => navigate(screens.UserProfile)}>
        <Image
          source={{
            uri: currentUser?.currentUser?.img,
          }}
          style={s.img}
          PlaceholderContent={<ActivityIndicator color={colors.white} />}
          placeholderStyle={common.placeholder}
        />
        <UserNameText>{currentUser?.currentUser?.userName}</UserNameText>
      </HeaderWithUserTouchable>
    </HeaderWithUserBlock>
  );
};

export default withCurrentUser(HeaderWithUser);
