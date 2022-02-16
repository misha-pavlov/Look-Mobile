import { compose } from 'recompose';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import UserProfile from './UserProfile';
import withGetUserChats from '../../hocs/withGetUserChats';

export const UserProfileContainer = compose(withCurrentUser, withGetUserChats)(UserProfile);
