import React, { useState } from 'react';
import { TouchableOpacity, View, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { UserProfileDesc, ShowMoreButtonText } from '../../UserProfile.styles';
import { messages } from '../../../../config/messages';
import { common } from '../../../../common/common.styles';

const ShowMore = ({ value, onPress, disabled }: { value: string; onPress: VoidFunction; disabled?: boolean }) => {
  const [showMore, setShowMore] = useState(false);

  if (value?.length < 50 || !value) {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Hyperlink linkDefault onPress={Linking.openURL} linkStyle={common.url}>
          <UserProfileDesc>{value}</UserProfileDesc>
        </Hyperlink>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Hyperlink linkDefault onPress={Linking.openURL} linkStyle={common.url}>
          <UserProfileDesc>{showMore ? value.trim() : `${value.slice(0, 50)?.trim()}...`}</UserProfileDesc>
        </Hyperlink>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowMore(!showMore)} disabled={disabled}>
        <ShowMoreButtonText>{showMore ? messages.showLess : messages.showMore}</ShowMoreButtonText>
      </TouchableOpacity>
    </View>
  );
};

export default ShowMore;
