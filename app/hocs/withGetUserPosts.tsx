import React, { ComponentType } from 'react';
import { TCustomProfileTabsTypes } from '../screens/UserProfile/components/CustomProfileTabs/CustomProfileTabs.types';
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '../screens/UserProfile/components/CustomProfileTabs/gql/CustomProfileTabs.queries';

export const withGetUserPosts = (BaseComponent: ComponentType<TCustomProfileTabsTypes>): ComponentType => {
  let WithGetUserPosts: React.FC<TCustomProfileTabsTypes>;
  WithGetUserPosts = props => {
    const { data, loading } = useQuery(GET_USER_POSTS, {
      variables: { userId: props.currentUser._id },
      /*pollInterval: 5000,*/
    });
    return <BaseComponent {...props} posts={data?.getUserPosts} loading={loading} />;
  };

  return WithGetUserPosts;
};
