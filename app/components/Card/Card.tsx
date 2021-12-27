import React from 'react';
import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { isImageUrl } from '../../helpers/isImageUrl';
import { CardBlock, CardTitle, s } from './Card.styles';
import { colors } from '../../config/colors';
import { common } from '../../common/common.styles';
import { TCard } from './Card.types';

const Card: React.FC<TCard> = ({ post, onPress }) => {
  if (isImageUrl(post.img)) {
    return (
      <CardBlock onPress={onPress}>
        <Image
          source={{
            uri: post.img,
          }}
          style={s.img}
          PlaceholderContent={<ActivityIndicator color={colors.white} />}
          placeholderStyle={common.placeholder}
        />
        <CardTitle>{post.title.length > 23 ? `${post.title.slice(0, 20)}...` : post.title}</CardTitle>
      </CardBlock>
    );
  }

  return null;
};

export default Card;
