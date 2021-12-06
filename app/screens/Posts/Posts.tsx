import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserId } from '../../hooks/useUserId';
import HeaderWithUser from './components/HeaderWithUser/HeaderWithUser';

const Posts = () => {
  const isFirstRender = useRef(true);
  const { userId } = useUserId();
  const navigation = useNavigation();

  useEffect(() => {
    if (!userId && !isFirstRender.current) {
      navigation.goBack();
    }
    isFirstRender.current = false;
  }, [userId]);

  return (
    <View>
      <HeaderWithUser />
      <Text>Posts</Text>
    </View>
  );
};

export default Posts;
