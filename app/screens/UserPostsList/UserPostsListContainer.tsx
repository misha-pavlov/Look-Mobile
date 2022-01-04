import { compose } from 'recompose';
import UserPostsList from './UserPostsList';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import { withGetUserPosts } from '../../hocs/withGetUserPosts';

export const UserPostsListContainer = compose(withCurrentUser, withGetUserPosts)(UserPostsList);
