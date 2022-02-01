import React from 'react';
import { Image } from 'react-native-elements';
import { ActivityIndicator, ImageStyle, StyleProp } from 'react-native';
import { constants } from '../../config/constants';
import { colors } from '../../config/colors';
import { common } from '../../common/common.styles';

const UserImage = ({ uri, styles }: { uri?: string; styles: StyleProp<ImageStyle> }) => {
  return (
    <Image
      source={{
        uri: uri ? uri : constants.userMock,
      }}
      style={styles}
      PlaceholderContent={<ActivityIndicator color={colors.white} />}
      placeholderStyle={common.placeholder}
    />
  );
};

export default UserImage;
