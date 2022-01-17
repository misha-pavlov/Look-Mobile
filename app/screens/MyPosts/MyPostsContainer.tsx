import { compose } from 'recompose';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import MyPosts from './MyPosts';
import { TUserProfile } from '../UserProfile/UserProfile.types';
import { GET_POSTS_FOR_USER } from './graphql/MyPosts.queries';
import { TMyPosts } from './MyPosts.types';

const withGetPostsForUser = (BaseComponent: FC<TMyPosts>) => {
  return (props: TUserProfile): JSX.Element => {
    const { currentUser } = props;
    const { data, loading, refetch } = useQuery(GET_POSTS_FOR_USER, { variables: { userId: currentUser._id } });
    return <BaseComponent {...props} getPostsForUser={data?.getPostsForUser} loading={loading} refetch={refetch} />;
  };
};

export const MyPostsContainer = compose(withCurrentUser, withGetPostsForUser)(MyPosts);
