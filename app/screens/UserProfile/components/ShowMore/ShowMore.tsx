import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { UserProfileDesc, ShowMoreButtonText } from '../../UserProfile.styles';
import { messages } from '../../../../config/messages';

const ShowMore = ({ value, onPress, disabled }: { value: string; onPress: VoidFunction; disabled?: boolean }) => {
  const [showMore, setShowMore] = useState(false);

  if (value?.length < 50 || !value) {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <UserProfileDesc>{value}</UserProfileDesc>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <UserProfileDesc>{showMore ? value.trim() : `${value.slice(0, 50)?.trim()}...`}</UserProfileDesc>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowMore(!showMore)} disabled={disabled}>
        <ShowMoreButtonText>{showMore ? messages.showLess : messages.showMore}</ShowMoreButtonText>
      </TouchableOpacity>
    </View>
  );
};

export default ShowMore;
