import React from 'react';
import { compose } from 'recompose';
import { useQuery } from '@apollo/client';
import CustomProfileTabs from './CustomProfileTabs';
import { withGetUserPosts } from '../../../../hocs/withGetUserPosts';
import { TCustomProfileTabsTypes } from './CustomProfileTabs.types';
import { GET_FOLLOWERS } from './gql/CustomProfileTabs.queries';
import { TUserProfile } from '../../UserProfile.types';

const withFollowers = (BaseComponent: React.FC<TCustomProfileTabsTypes>) => {
  return (props: TCustomProfileTabsTypes) => {
    const { currentUser } = props;

    const { data, loading } = useQuery(GET_FOLLOWERS, {
      variables: { userId: currentUser._id },
      skip: currentUser._id === undefined,
    });

    return <BaseComponent {...props} followers={data?.getFollowers} loading={loading} />;
  };
};

export const CustomProfileTabsContainer = compose(
  withGetUserPosts,
  withFollowers,
)(CustomProfileTabs) as React.ComponentClass<TUserProfile>;
