import { compose } from 'recompose';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import BlockedUsers from './BlockedUsers';

export const BlockedUsersContainer = compose(withCurrentUser)(BlockedUsers);
