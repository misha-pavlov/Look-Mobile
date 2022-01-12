import React, { useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TUserPostsList } from './UserPostsList.types';
import { colors } from '../../config/colors';
import PostItem from './components/PostItem/PostItem';
import { Posts } from '../../types/graphql';
import { NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';
import { getKeyboardVerticalOffset, keyboardBehaviorDependsOnPlatform } from '../../config/platform';
import { common, DefaultContainer } from '../../common/common.styles';
import { screens } from '../../config/screens';

const UserPostsList: React.FC<TUserPostsList> = ({ currentUser, posts }) => {
  const navigation = useNavigation();
  const { params } = useRoute<NAppNavigatorRouteProp<'UserPostsList'>>();
  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ headerTitle: screens.Posts, headerTitleStyle: { color: colors.white } });
    flatListRef.current.scrollToIndex({ animated: true, index: params.indexItem });
  }, []);

  const keyExtractor = (item: Posts) => item._id;

  const getItemLayout = (data: [Posts], index: number) => {
    return { length: data.length, offset: 660 * index, index };
  };

  const keyboardVerticalOffset = getKeyboardVerticalOffset();

  return (
    <DefaultContainer>
      <KeyboardAvoidingView
        style={common.keyboard}
        behavior={keyboardBehaviorDependsOnPlatform}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <FlatList
          data={posts}
          ref={flatListRef}
          renderItem={p => <PostItem post={p.item} key={p.item._id} currentUser={currentUser} />}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
        />
      </KeyboardAvoidingView>
    </DefaultContainer>
  );
};

export default UserPostsList;
