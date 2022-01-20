import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
// types
import { User } from '../../../../../../types/graphql';
import { NAppNavigatorNavigationProp } from '../../../../../../navigation/types/AppNavigator.types';
// components
import FollowButton from '../../../../../../components/FollowButton/FollowButton';
// styles
import {
  s,
  UserBlock,
  UserImageAndName,
  UserText,
} from '../../../../../UserProfile/components/CustomProfileTabs/components/UsersList/UserList.styles';
import { common } from '../../../../../../common/common.styles';
// constants
import { colors } from '../../../../../../config/colors';
import { constants } from '../../../../../../config/constants';
import { screens } from '../../../../../../config/screens';
// gql
import { DO_FOLLOW } from '../../../../../../gql/user.mutations';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../../../../../../gql/user.queries';

const UsersItem = ({ user, currentUser }: { user: User; currentUser: User }) => {
  const navigation = useNavigation<NAppNavigatorNavigationProp<'UserProfile'>>();
  const [mutate] = useMutation(DO_FOLLOW, { onError: error => console.log('DO_FOLLOW UserList = ', error) });

  const onPress = useCallback(async (isFollow, followUserId) => {
    await mutate({
      variables: { isFollow, userId: currentUser._id, followUserId },
      refetchQueries: [
        { query: GET_FOLLOWERS, variables: { userId: followUserId } },
        { query: GET_FOLLOWING, variables: { userId: followUserId } },
        { query: GET_FOLLOWERS, variables: { userId: currentUser._id } },
        { query: GET_FOLLOWING, variables: { userId: currentUser._id } },
      ],
    });
  }, []);

  return (
    <UserBlock onPress={() => navigation.navigate(screens.UserProfile, { user })} isUserItem>
      <UserImageAndName>
        <Image
          source={{
            uri: user?.img ? user?.img : constants.userMock,
          }}
          style={s.img}
          PlaceholderContent={<ActivityIndicator color={colors.white} />}
          placeholderStyle={common.placeholder}
        />
        <UserText>{user?.userName}</UserText>
      </UserImageAndName>

      {user._id !== currentUser._id && (
        <FollowButton
          followStatus={currentUser.following.includes(user._id)}
          onPress={() => onPress(!currentUser.following.includes(user._id), user._id)}
        />
      )}
    </UserBlock>
  );
};

export default UsersItem;
