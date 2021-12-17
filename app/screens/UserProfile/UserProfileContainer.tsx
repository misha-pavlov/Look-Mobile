import { compose } from 'recompose';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import UserProfile from './UserProfile';

export const UserProfileContainer = compose(withCurrentUser)(UserProfile);
