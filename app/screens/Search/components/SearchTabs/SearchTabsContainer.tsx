import { compose } from 'recompose';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import SearchTabs from './SearchTabs';
import { GET_ALL_POSTS } from './gql/SearchTabs.queries';
import { TSearchTabs } from './SearchTabs.types';

const withGetAllPosts = (BaseComponent: FC<TSearchTabs>) => {
  return (props: TSearchTabs): JSX.Element => {
    const { data, loading } = useQuery(GET_ALL_POSTS);

    return <BaseComponent {...props} getAllPosts={data?.getAllPosts} loading={loading} />;
  };
};

export const SearchTabsContainer = compose(withGetAllPosts)(SearchTabs) as unknown as FC<TSearchTabs>;
