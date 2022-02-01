import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// types
import { Activity, User } from '../../../../types/graphql';
import { NAppNavigatorNavigationProp } from '../../../../navigation/types/AppNavigator.types';
// styles
import { ActivityBlock, DateMessageText, FlexBlock, s, UserNameCommentText } from './ActivityItem.styles';
// graphql
import { GET_USER } from '../../../../gql/user/user.queries';
import { SET_UNREAD_ACTIVITY } from '../../gql/Activity.mutations';
import { GET_POST } from './gql/ActivityItem.queries';
// components
import UserImage from '../../../../components/UserImage/UserImage';
// helpers
import { getDateForActivity } from './helpers/activityItemHelpers';
// constants
import { messages } from '../../../../config/messages';
import { screens } from '../../../../config/screens';

const ActivityItem: React.FC<{ activity: Activity; currentUser: User }> = ({ activity, currentUser }) => {
  const { data } = useQuery(GET_USER, { variables: { userId: activity.actionUserId } });
  const postData = useQuery(GET_POST, { variables: { postId: activity.postId } });
  const [mutate] = useMutation(SET_UNREAD_ACTIVITY, { onError: e => console.log('SET_UNREAD_ACTIVITY = ', e) });
  const { navigate } = useNavigation<NAppNavigatorNavigationProp<'UserProfile'>>();

  useEffect(() => {
    (async () => {
      await mutate({
        variables: {
          activityId: activity._id,
        },
      });
    })();
  }, []);

  const activityDate = activity.date as unknown as number;
  const isCommentActivity = activity?.commentText;
  const post = postData?.data?.getPost;

  return (
    <ActivityBlock isCommentActivity={!isCommentActivity}>
      <FlexBlock isCommentActivity={!isCommentActivity}>
        <UserImage uri={data?.getUser?.img} styles={s.img} />
        <View>
          <FlexBlock>
            <TouchableOpacity onPress={() => navigate(screens.UserProfile, { user: data?.getUser })}>
              <UserNameCommentText>{data?.getUser.userName}</UserNameCommentText>
            </TouchableOpacity>

            <DateMessageText>{isCommentActivity ? messages.commented : messages.startedFollowing}</DateMessageText>
          </FlexBlock>

          {isCommentActivity && (
            <TouchableOpacity onPress={() => navigate(screens.SoloPost, { post, currentUser })}>
              <UserNameCommentText>{`"${activity.commentText}"`}</UserNameCommentText>
              <UserImage uri={post.img} styles={s.postImg} />
            </TouchableOpacity>
          )}
        </View>
      </FlexBlock>

      <View>
        <DateMessageText>{getDateForActivity(activityDate)}</DateMessageText>
      </View>
    </ActivityBlock>
  );
};

export default ActivityItem;
