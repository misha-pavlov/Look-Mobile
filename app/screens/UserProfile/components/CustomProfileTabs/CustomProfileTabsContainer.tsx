import { compose } from 'recompose';
import CustomProfileTabs from './CustomProfileTabs';
import { withCurrentUser } from '../../../../hocs/withCurrentUser';
import { withGetUserPosts } from '../../../../hocs/withGetUserPosts';

export const CustomProfileTabsContainer = compose(withCurrentUser, withGetUserPosts)(CustomProfileTabs);
