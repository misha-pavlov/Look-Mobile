import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { Image } from 'react-native-elements';
// styles
import { common, DefaultContainer } from '../../common/common.styles';
import {
  s,
  UserBlock,
  UserImageAndName,
  UserText,
} from '../UserProfile/components/CustomProfileTabs/components/UsersList/UserList.styles';
// types
import { TUserProfile } from '../UserProfile/UserProfile.types';
import { User } from '../../types/graphql';
// constants
import { constants } from '../../config/constants';
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
// graphql
import { GET_BLOCKED_USERS } from './gql/BlockedUsers.queries';
import { UNBLOCK_USER } from './gql/BlockedUsers.mutations';
// components
import Spinner from '../../components/Spinner/Spinner';
import FollowButton from '../../components/FollowButton/FollowButton';

const BlockedUsers: React.FC<TUserProfile> = ({ currentUser }) => {
  const { data, loading } = useQuery(GET_BLOCKED_USERS, { variables: { userId: currentUser._id } });
  const [mutate] = useMutation(UNBLOCK_USER, { onError: error => console.log('UNBLOCK_USER = ', error) });

  const doUnblock = useCallback(
    async targetUserId => {
      await mutate({
        variables: { userId: currentUser._id, targetUserId },
        refetchQueries: [{ query: GET_BLOCKED_USERS, variables: { userId: currentUser._id } }],
      });
    },
    [mutate],
  );

  const renderItem = useCallback(
    c => {
      return (
        <UserBlock disabled>
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

          <FollowButton followStatus={false} onPress={() => doUnblock(c.item?._id)} text={messages.unblock} />
        </UserBlock>
      );
    },
    [currentUser],
  );

  const keyExtractor = (item: User) => item._id;

  if (loading) {
    return <Spinner />;
  }

  return (
    <DefaultContainer>
      <FlatList data={data.getBlocked} renderItem={renderItem} keyExtractor={keyExtractor} />
    </DefaultContainer>
  );
};

export default BlockedUsers;
