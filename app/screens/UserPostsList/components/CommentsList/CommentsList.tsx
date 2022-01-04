import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Image } from 'react-native-elements';
import { Comment } from '../../../../types/graphql';
import { CommentBlock, CommentText, s } from './CommentsList.styles';
import { colors } from '../../../../config/colors';
import { common } from '../../../../common/common.styles';

const CommentsList = ({ comments, isShortList }: { comments: Comment[]; isShortList?: boolean }) => {
  const renderItem = useCallback(c => {
    return (
      <CommentBlock>
        <Image
          source={{
            uri: c.item?.user?.img,
          }}
          style={s.img}
          PlaceholderContent={<ActivityIndicator color={colors.white} />}
          placeholderStyle={common.placeholder}
        />
        <CommentText>{c.item?.title}</CommentText>
      </CommentBlock>
    );
  }, []);

  const keyExtractor = (item: Comment) => item?._id;

  return (
    <FlatList
      data={isShortList ? [comments[comments.length - 1]] : comments}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default CommentsList;
