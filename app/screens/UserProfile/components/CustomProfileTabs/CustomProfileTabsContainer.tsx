import React from 'react';
import { compose } from 'recompose';
import { useQuery } from '@apollo/client';
import CustomProfileTabs from './CustomProfileTabs';
import { withGetUserPosts } from '../../../../hocs/withGetUserPosts';
import { TCustomProfileTabsContainer, TCustomProfileTabs } from './CustomProfileTabs.types';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../../../../gql/user.queries';

const withFollowers = (BaseComponent: React.FC<TCustomProfileTabs>) => {
  return (props: TCustomProfileTabs) => {
    const { user } = props;

    const { data, loading } = useQuery(GET_FOLLOWERS, {
      variables: { userId: user._id },
      skip: user._id === undefined,
    });

    return <BaseComponent {...props} followers={data?.getFollowers} loading={loading} />;
  };
};

const withFollowing = (BaseComponent: React.FC<TCustomProfileTabs>) => {
  return (props: TCustomProfileTabs) => {
    const { user } = props;

    const { data, loading } = useQuery(GET_FOLLOWING, {
      variables: { userId: user._id },
      skip: user._id === undefined,
    });

    return <BaseComponent {...props} following={data?.getFollowing} loading={loading} />;
  };
};

export const CustomProfileTabsContainer = compose(
  withGetUserPosts,
  withFollowers,
  withFollowing,
)(CustomProfileTabs) as React.ComponentClass<TCustomProfileTabsContainer>;
