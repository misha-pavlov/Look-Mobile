import React from 'react';
import { useQuery } from '@apollo/client';
import { TouchableOpacity, View } from 'react-native';
import { Activity } from '../../../../types/graphql';
import { ActivityBlock, DateMessageText, FlexBlock, s, UserNameCommentText } from './ActivityItem.styles';
import { GET_USER } from '../../../../gql/user/user.queries';
import UserImage from '../../../../components/UserImage/UserImage';
import { getDateForActivity } from './helpers/activityItemHelpers';
import { messages } from '../../../../config/messages';

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  const { data } = useQuery(GET_USER, { variables: { userId: activity.actionUserId } });

  const activityDate = activity.date as unknown as number;
  const isCommentActivity = activity?.commentText;

  return (
    <ActivityBlock isCommentActivity={!isCommentActivity}>
      <FlexBlock isCommentActivity={!isCommentActivity}>
        <UserImage uri={data?.getUser?.img} styles={s.img} />
        <View>
          <FlexBlock>
            <TouchableOpacity>
              <UserNameCommentText>{data?.getUser.userName}</UserNameCommentText>
            </TouchableOpacity>

            <DateMessageText>{isCommentActivity ? messages.commented : messages.startedFollowing}</DateMessageText>
          </FlexBlock>

          {isCommentActivity && (
            <TouchableOpacity>
              <UserNameCommentText>{`"${activity.commentText}"`}</UserNameCommentText>
              <UserImage uri={activity.postImage} styles={s.postImg} />
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
