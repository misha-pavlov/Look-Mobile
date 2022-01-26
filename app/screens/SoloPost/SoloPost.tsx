import React from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PostItem from '../../components/PostItem/PostItem';
import { NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';
import { DefaultContainer } from '../../common/common.styles';
import { Posts } from '../../types/graphql';

const SoloPost = () => {
  const { params } = useRoute<NAppNavigatorRouteProp<'SoloPost'>>();

  const post = params.post;
  const currentUser = params.currentUser;

  return (
    <DefaultContainer>
      {/* add FlatList with 1 item for escape error with ScrollView + FlatList in Comments */}
      <FlatList
        data={[post]}
        keyExtractor={(item: Posts) => item._id}
        renderItem={() => <PostItem post={post} currentUser={currentUser} showAllComments />}
      />
    </DefaultContainer>
  );
};

export default SoloPost;
