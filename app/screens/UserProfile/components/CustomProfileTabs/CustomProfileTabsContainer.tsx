import React, { ComponentType } from 'react';
import { compose } from 'recompose';
import { useQuery } from '@apollo/client';
import { withCurrentUser } from '../../../../hocs/withCurrentUser';
import CustomProfileTabs from './CustomProfileTabs';
import { TCustomProfileTabsTypes } from './CustomProfileTabs.types';
import { GET_USER_POSTS } from './gql/CustomProfileTabs.queries';

const withGetUserPosts = (BaseComponent: ComponentType<TCustomProfileTabsTypes>): ComponentType => {
  let WithGetUserPosts: React.FC<TCustomProfileTabsTypes>;
  WithGetUserPosts = props => {
    const { data, loading } = useQuery(GET_USER_POSTS, { variables: { userId: props.currentUser._id } });

    return <BaseComponent {...props} posts={data?.getUserPosts} loading={loading} />;
  };

  return WithGetUserPosts;
};

export const CustomProfileTabsContainer = compose(withCurrentUser, withGetUserPosts)(CustomProfileTabs);
