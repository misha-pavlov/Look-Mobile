import React, { useCallback, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
// helpers
import { isImageUrl } from '../../helpers/isImageUrl';
import { formatAMPM } from '../../helpers/formatAMPM';
// types
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';
import { TPostItem } from './PostItem.types';
// styles
import { ItemAvatarBlock, ItemContainer, ItemDescBlock, ItemText, ItemTime, s, ShowAllText } from './PostItem.styles';
import { common } from '../../common/common.styles';
// hooks
import { useGetUser } from '../../hooks/useGetUser';
// constants
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
import { screens } from '../../config/screens';
// components
import Tags from '../../screens/UserPostsList/components/Tags/Tags';
import CommentsList from '../../screens/UserPostsList/components/CommentsList/CommentsList';
import GrayInput from '../GrayInput/GrayInput';
// gql
import { ADD_COMMENT } from './gql/PostItem.mutations';
import { GET_USER_POSTS } from '../../screens/UserProfile/components/CustomProfileTabs/gql/CustomProfileTabs.queries';
import { ADD_USER_ACTIVITY } from '../../gql/activity/activity.mutations';
import UserImage from '../UserImage/UserImage';

const PostItem: React.FC<TPostItem> = ({ post, currentUser, showAllComments }) => {
  const { navigate } = useNavigation<NAppNavigatorNavigationProp<'UserProfile'>>();
  const [showAllComment, setShowAllComment] = useState(showAllComments ? showAllComments : false);
  const [comment, setComment] = useState('');
  const user = useGetUser(post.createdByUserId);
  /* just for fix types */
  const postTimeProps = post.time as unknown as number;
  const postTime = new Date(postTimeProps * 1000);

  const [mutate] = useMutation(ADD_COMMENT, {
    onError: error => console.log('ADD_COMMENT = ', error),
  });
  const [activityMutate] = useMutation(ADD_USER_ACTIVITY, {
    onError: error => console.log('ADD_USER_ACTIVITY = ', error),
  });

  const showComments = useCallback(() => {
    if (post.comments.length > 0) {
      return (
        <>
          <CommentsList comments={post.comments} isShortList={!showAllComment} />
          {post.comments.length > 1 && (
            <TouchableOpacity onPress={() => setShowAllComment(!showAllComment)}>
              <ShowAllText>{showAllComment ? messages.showLess : messages.showAll}</ShowAllText>
            </TouchableOpacity>
          )}
        </>
      );
    }

    return null;
  }, [post, showAllComment]);

  const onPress = useCallback(async () => {
    await mutate({
      variables: {
        title: comment,
        userId: currentUser._id,
        postId: post._id,
      },
      refetchQueries: [{ query: GET_USER_POSTS, variables: { userId: user._id } }],
    }).then(() => setComment(''));

    await activityMutate({
      variables: {
        actionUserId: currentUser._id,
        targetUserId: post.createdByUserId,
        commentText: comment,
        postImage: post.img,
      },
    });
  }, [mutate, setComment, comment]);

  if (!isImageUrl(post.img)) {
    return null;
  }

  return (
    <ItemContainer>
      <ItemAvatarBlock onPress={() => navigate(screens.UserProfile, { user })}>
        <UserImage uri={user?.img} styles={s.img} />
        <View>
          <ItemText>{user?.userName}</ItemText>
          {postTime && <ItemTime>{formatAMPM(postTime)}</ItemTime>}
        </View>
      </ItemAvatarBlock>

      <Image
        source={{
          uri: post.img,
        }}
        style={s.postImg}
        PlaceholderContent={<ActivityIndicator color={colors.white} />}
        placeholderStyle={common.placeholder}
      />

      <ItemDescBlock>
        <ItemText>{post.title}</ItemText>
      </ItemDescBlock>

      <Tags tags={post.tags} />

      {showComments()}
      <GrayInput
        comment={comment}
        setComment={setComment}
        currentUser={currentUser}
        rightElement={
          <TouchableOpacity disabled={comment === ''} onPress={onPress}>
            <MaterialCommunityIcons
              name="send-circle"
              size={25}
              color={comment === '' ? colors.gray1 : colors.purple}
            />
          </TouchableOpacity>
        }
      />
    </ItemContainer>
  );
};

export default PostItem;
