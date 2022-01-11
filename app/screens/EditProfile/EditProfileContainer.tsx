import { compose } from 'recompose';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import EditProfile from './EditProfile';

export const EditProfileContainer = compose(withCurrentUser)(EditProfile);
