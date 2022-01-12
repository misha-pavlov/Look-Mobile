import { compose } from 'recompose';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import ChangePassword from './ChangePassword';

export const ChangePasswordContainer = compose(withCurrentUser)(ChangePassword);
