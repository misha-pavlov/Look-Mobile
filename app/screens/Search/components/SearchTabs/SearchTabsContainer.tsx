import { compose } from 'recompose';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import SearchTabs from './SearchTabs';
import { GET_ALL_POSTS } from './gql/SearchTabs.queries';
import { TSearchTabs } from './SearchTabs.types';
import { GET_USERS } from '../../../../gql/user/user.queries';
import { withCurrentUser } from '../../../../hocs/withCurrentUser';

const withGetAllPosts = (BaseComponent: FC<TSearchTabs>) => {
  return (props: TSearchTabs): JSX.Element => {
    const { data, loading } = useQuery(GET_ALL_POSTS);
    return <BaseComponent {...props} getAllPosts={data?.getAllPosts} loading={loading} />;
  };
};

const withGetUsers = (BaseComponent: FC<TSearchTabs>) => {
  return (props: TSearchTabs): JSX.Element => {
    const { data, loading } = useQuery(GET_USERS);
    return <BaseComponent {...props} users={data?.users} loading={loading} />;
  };
};

export const SearchTabsContainer = compose(
  withGetAllPosts,
  withGetUsers,
  withCurrentUser,
)(SearchTabs) as unknown as FC<TSearchTabs>;
