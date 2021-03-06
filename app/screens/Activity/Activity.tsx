import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { DefaultContainer } from '../../common/common.styles';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { screens } from '../../config/screens';
import { TUserProfile } from '../UserProfile/UserProfile.types';
import { GET_USER_ACTIVITIES } from './gql/Activity.queries';
import { Activity as TActivity } from '../../types/graphql';
import ActivityItem from './components/ActivityItem/ActivityItem';

const Activity: React.FC<TUserProfile> = ({ currentUser }) => {
  const { data } = useQuery(GET_USER_ACTIVITIES, { variables: { userId: currentUser?._id }, skip: !currentUser?._id });
  const keyExtractor = (item: TActivity) => item._id;
  return (
    <DefaultContainer>
      <FlatList
        data={data?.getUserActivities}
        renderItem={({ item }) => <ActivityItem activity={item} currentUser={currentUser} />}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<ScreenHeader text={screens.Activity} />}
      />
    </DefaultContainer>
  );
};

export default Activity;
