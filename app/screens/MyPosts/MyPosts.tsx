import React, { useEffect, useRef } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
// hooks
import { useUserId } from '../../hooks/useUserId';
// components
import HeaderWithUser from '../../components/HeaderWithUser/HeaderWithUser';
import PostItem from '../../components/PostItem/PostItem';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
// styles
import { EmptyText, PlusButton, s } from './MyPosts.styles';
// constants
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';
import { DefaultContainer } from '../../common/common.styles';
import { messages } from '../../config/messages';
// types
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';
import { TMyPosts } from './MyPosts.types';
import { Posts } from '../../types/graphql';

const MyPosts: React.FC<TMyPosts> = ({ getPostsForUser, currentUser, loading, refetch, fetchMore }) => {
  const isFirstRender = useRef(true);
  const { userId, loading: userLoading } = useUserId();
  const navigation = useNavigation<NAppNavigatorNavigationProp<'CreatePost'>>();

  useEffect(() => {
    if (!userId && !isFirstRender.current) {
      navigation.goBack();
    }
    isFirstRender.current = false;
  }, [userId, isFirstRender, navigation]);

  const keyExtractor = (item: Posts) => item._id;

  if (loading || userLoading) {
    return <LoadingScreen />;
  }

  return (
    <DefaultContainer>
      <HeaderWithUser />
      <FlatList
        data={getPostsForUser}
        renderItem={p => <PostItem post={p.item} currentUser={currentUser} />}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        onEndReached={() =>
          fetchMore({
            variables: { limit: getPostsForUser.length * 2 },
          })
        }
        ListEmptyComponent={<EmptyText>{messages.emptyPosts}</EmptyText>}
      />
      <PlusButton style={s.shadow} onPress={() => navigation.navigate(screens.CreatePost)}>
        <Feather name="plus" size={25} color={colors.white} />
      </PlusButton>
    </DefaultContainer>
  );
};

export default MyPosts;
