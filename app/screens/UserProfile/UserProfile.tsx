import React from 'react';
import { View, Text } from 'react-native';
import { TUserProfile } from './UserProfile.types';

const UserProfile: React.FC<TUserProfile> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
};

export default UserProfile;
