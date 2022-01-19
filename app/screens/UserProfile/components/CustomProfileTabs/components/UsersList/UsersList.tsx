import React, { useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
// types
import { User } from '../../../../../../types/graphql';
import { NAppNavigatorNavigationProp } from '../../../../../../navigation/types/AppNavigator.types';
// components
import Spinner from '../../../../../../components/Spinner/Spinner';
import FollowButton from '../../../../../../components/FollowButton/FollowButton';
// styles
import { s, UserBlock, UserImageAndName, UserText } from './UserList.styles';
import { common } from '../../../../../../common/common.styles';
// constants
import { colors } from '../../../../../../config/colors';
import { constants } from '../../../../../../config/constants';
import { screens } from '../../../../../../config/screens';
// gql
import { DO_FOLLOW } from '../../../../../../gql/user.mutations';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../../gql/CustomProfileTabs.queries';

const UsersList = ({ data, loading, currentUser }: { data?: [User]; loading: boolean; currentUser: User }) => {
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

  const renderItem = useCallback(
    c => {
      return (
        <UserBlock onPress={() => navigation.navigate(screens.UserProfile, { user: c.item })}>
          <UserImageAndName>
            <Image
              source={{
                uri: c.item?.img ? c.item?.img : constants.userMock,
              }}
              style={s.img}
              PlaceholderContent={<ActivityIndicator color={colors.white} />}
              placeholderStyle={common.placeholder}
            />
            <UserText>{c.item?.userName}</UserText>
          </UserImageAndName>

          {c.item._id !== currentUser._id && (
            <FollowButton
              followStatus={currentUser.following.includes(c.item._id)}
              onPress={() => onPress(!currentUser.following.includes(c.item._id), c.item._id)}
            />
          )}
        </UserBlock>
      );
    },
    [data, currentUser],
  );

  const keyExtractor = (item: User) => item._id;

  if (loading) {
    return <Spinner />;
  }

  return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />;
};

export default UsersList;
