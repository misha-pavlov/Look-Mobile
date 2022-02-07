import React, { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { DefaultContainer } from '../../common/common.styles';
import GraySearchInput from '../../components/GraySearchInput/GraySearchInput';
import { GET_USERS, SEARCH_USER } from '../../gql/user/user.queries';
import { ApolloFetchPolicy } from '../../common/apollo';
import { User } from '../../types/graphql';
import UserImage from '../../components/UserImage/UserImage';
import Spinner from '../../components/Spinner/Spinner';
import { s, UserNameText, UserRow } from './AddChat.styles';

const AddChat = () => {
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

  const renderItem = useCallback(({ item }: { item: User }) => {
    return (
      <UserRow>
        <UserImage styles={s.img} uri={item.img} />
        <UserNameText>{item.userName}</UserNameText>
      </UserRow>
    );
  }, []);

  const keyExtractor = (item: User) => item._id;

  const data = useMemo(
    () => (isSearchMode ? dataSearchUsers?.searchUser : dataUsers?.users),
    [isSearchMode, dataUsers, dataSearchUsers],
  );

  if (loading) {
    return <Spinner withMarginTop />;
  }

  return (
    <DefaultContainer>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          data.length > 10 && (
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

export default AddChat;
