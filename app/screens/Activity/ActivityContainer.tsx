import { compose } from 'recompose';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import Activity from './Activity';

export const ActivityContainer = compose(withCurrentUser)(Activity);
