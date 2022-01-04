import React, { useCallback, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
// helpers
import { isImageUrl } from '../../../../helpers/isImageUrl';
import { formatAMPM } from '../../../../helpers/formatAMPM';
// types
import { Posts, User } from '../../../../types/graphql';
// styles
import { ItemAvatarBlock, ItemContainer, ItemDescBlock, ItemText, ItemTime, s, ShowAllText } from './PostItem.styles';
import { common } from '../../../../common/common.styles';
// hooks
import { useGetUser } from '../../../../hooks/useGetUser';
// constants
import { colors } from '../../../../config/colors';
import { messages } from '../../../../config/messages';
// components
import Tags from '../Tags/Tags';
import CommentsList from '../CommentsList/CommentsList';
import GrayInput from '../../../../components/GrayInput/GrayInput';
// graphql
import { ADD_COMMENT } from './gql/PostItem.mutations';
import { GET_USER_POSTS } from '../../../UserProfile/components/CustomProfileTabs/gql/CustomProfileTabs.queries';

const PostItem = ({ post, currentUser }: { post: Posts; currentUser: User }) => {
  const [showAllComment, setShowAllComment] = useState(false);
  const [comment, setComment] = useState('');
  const user = useGetUser(post.createdByUserId);
  /* just for fix types */
  const postTimeProps = post.time as unknown as number;
  const postTime = new Date(postTimeProps * 1000);

  const [mutate] = useMutation(ADD_COMMENT, {
    onError: error => console.log('ADD_COMMENT = ', error),
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
  }, [mutate, setComment, comment]);

  if (!isImageUrl(post.img)) {
    return null;
  }

  return (
    <ItemContainer>
      <ItemAvatarBlock>
        <Image
          source={{
            uri: user?.img,
          }}
          style={s.img}
          PlaceholderContent={<ActivityIndicator color={colors.white} />}
          placeholderStyle={common.placeholder}
        />
        <View>
          <ItemText>{user?.userName}</ItemText>
          {postTime && <ItemTime>{formatAMPM(postTime)}</ItemTime>}
        </View>
      </ItemAvatarBlock>

      <ItemDescBlock>
        <ItemText>{post.title}</ItemText>
      </ItemDescBlock>

      <Image
        source={{
          uri: post.img,
        }}
        style={s.postImg}
        PlaceholderContent={<ActivityIndicator color={colors.white} />}
        placeholderStyle={common.placeholder}
      />

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
