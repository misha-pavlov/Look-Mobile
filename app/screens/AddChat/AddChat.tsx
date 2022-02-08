import React, { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
// styles
import { DefaultContainer } from '../../common/common.styles';
import { s, UserNameText, UserRow } from './AddChat.styles';
// components
import GraySearchInput from '../../components/GraySearchInput/GraySearchInput';
import UserImage from '../../components/UserImage/UserImage';
import Spinner from '../../components/Spinner/Spinner';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
// graphql
import { GET_USERS, SEARCH_USER } from '../../gql/user/user.queries';
import { ADD_CHAT } from '../../gql/chat/chat.mutations';
import { GET_USER_CHATS } from '../Chats/gql/Chats.queries';
// types
import { ApolloFetchPolicy } from '../../common/apollo';
import { User } from '../../types/graphql';
// hocs
import { withCurrentUser } from '../../hocs/withCurrentUser';
// constants
import { constants } from '../../config/constants';

const AddChat = (currentUser: { currentUser?: User }) => {
  const { goBack } = useNavigation();
  const [showError, setShowError] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const showCancel = searchText?.length > 0;

  const { data: dataUsers, loading } = useQuery(GET_USERS, {
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
  });
  const { data: dataSearchUsers } = useQuery(SEARCH_USER, {
    variables: { userName: searchText },
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
  });
  const [mutate] = useMutation(ADD_CHAT, {
    onError: e => {
      if (e.message === constants.errors.existingChat) {
        setShowError(true);
        return setTimeout(goBack, 2000);
      }

      console.log('ADD_CHAT = ', e);
      return goBack();
    },
    onCompleted: goBack,
  });

  const addChat = useCallback(
    async (user: User) => {
      const cUser = currentUser?.currentUser;
      const userImg = user.img ? user.img : constants.userMock;
      const cUserImg = user.img ? user.img : constants.userMock;

      if (cUser) {
        await mutate({
          variables: {
            title: `${user.userName} ${cUser.userName}`,
            members: [user._id, cUser._id],
            groupImage: `${userImg} ${cUserImg}`,
          },
          refetchQueries: [{ query: GET_USER_CHATS, variables: { userId: cUser._id } }],
        });
      }
    },
    [currentUser, showError],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => {
      return (
        <UserRow onPress={() => addChat(item)}>
          <UserImage styles={s.img} uri={item.img} />
          <UserNameText>{item.userName}</UserNameText>
        </UserRow>
      );
    },
    [addChat, showError],
  );

  const keyExtractor = (item: User) => item._id;

  const data = useMemo(
    () =>
      (isSearchMode ? dataSearchUsers?.searchUser : dataUsers?.users)?.filter(
        (d: User) => d._id !== currentUser?.currentUser?._id,
      ),
    [isSearchMode, dataUsers, dataSearchUsers],
  );

  if (loading) {
    return <Spinner withMarginTop />;
  }

  return (
    <DefaultContainer>
      {showError && <ErrorPopup text={constants.errors.existingChat} />}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          data?.length > 10 && (
            <GraySearchInput
              showCancel={showCancel}
              searchText={searchText}
              setSearchText={setSearchText}
              setIsSearchMode={setIsSearchMode}
            />
          )
        }
      />
    </DefaultContainer>
  );
};

export default withCurrentUser(AddChat);
