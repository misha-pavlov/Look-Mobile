import React, { ComponentType } from 'react';
import { useQuery } from '@apollo/client';
import { TCustomProfileTabs } from '../screens/UserProfile/components/CustomProfileTabs/CustomProfileTabs.types';
import { GET_USER_POSTS } from '../screens/UserProfile/components/CustomProfileTabs/gql/CustomProfileTabs.queries';

export const withGetUserPosts = (BaseComponent: ComponentType<TCustomProfileTabs>): ComponentType => {
  let WithGetUserPosts: React.FC<TCustomProfileTabs>;
  WithGetUserPosts = props => {
    const { user, route, currentUser } = props;

    const getUserId = () => {
      if (user?._id) {
        return user?._id;
      } else if (route.params?.createdByUserId) {
        return route.params?.createdByUserId;
      }

      return currentUser._id;
    };

    const { data, loading } = useQuery(GET_USER_POSTS, {
      variables: { userId: getUserId() },
    });
    return <BaseComponent {...props} posts={data?.getUserPosts} loading={loading} />;
  };

  return WithGetUserPosts;
};
