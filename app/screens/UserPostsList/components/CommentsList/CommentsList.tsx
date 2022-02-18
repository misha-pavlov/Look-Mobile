import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Linking } from 'react-native';
import { Image } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';
import * as Clipboard from 'expo-clipboard';
import { Comment } from '../../../../types/graphql';
import { CommentBlock, CommentText, s } from './CommentsList.styles';
import { colors } from '../../../../config/colors';
import { common } from '../../../../common/common.styles';

const CommentsList = ({ comments, isShortList }: { comments: Comment[]; isShortList?: boolean }) => {
  const reversedComments = [...comments].reverse();

  const onCopy = useCallback((comment: string) => {
    Clipboard.setString(comment);
  }, []);

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
        <Hyperlink
          linkDefault
          onPress={Linking.openURL}
          linkStyle={common.url}
          onLongPress={() => onCopy(c.item?.title)}>
          <CommentText>{c.item?.title}</CommentText>
        </Hyperlink>
      </CommentBlock>
    );
  }, []);

  const keyExtractor = (item: Comment) => item?._id;

  return (
    <FlatList
      data={isShortList ? [comments[comments.length - 1]] : reversedComments}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default CommentsList;
