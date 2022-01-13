import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useUserId } from '../../hooks/useUserId';
import HeaderWithUser from '../../components/HeaderWithUser/HeaderWithUser';
import { PlusButton, s } from './Posts.styles';
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';
import { DefaultContainer } from '../../common/common.styles';

const Posts = () => {
  const isFirstRender = useRef(true);
  const { userId } = useUserId();
  const navigation = useNavigation<NAppNavigatorNavigationProp<'CreatePost'>>();

  useEffect(() => {
    if (!userId && !isFirstRender.current) {
      navigation.goBack();
    }
    isFirstRender.current = false;
  }, [userId]);

  return (
    <DefaultContainer>
      <HeaderWithUser />
      <Text>Posts</Text>
      <PlusButton style={s.shadow} onPress={() => navigation.navigate(screens.CreatePost)}>
        <Feather name="plus" size={25} color={colors.white} />
      </PlusButton>
    </DefaultContainer>
  );
};

export default Posts;
