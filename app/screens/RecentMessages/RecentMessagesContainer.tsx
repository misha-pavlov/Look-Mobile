import { compose } from 'recompose';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import RecentMessages from './RecentMessages';

export const RecentMessagesContainer = compose(withCurrentUser)(RecentMessages);
