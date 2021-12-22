import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { UserProfileDesc, ShowMoreButtonText } from '../../UserProfile.styles';
import { messages } from '../../../../config/messages';

const ShowMore = ({ value, onPress }: { value: string; onPress: VoidFunction }) => {
  const [showMore, setShowMore] = useState(false);

  if (value.length < 50) {
    return (
      <TouchableOpacity onPress={onPress}>
        <UserProfileDesc>{value}</UserProfileDesc>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <UserProfileDesc>{showMore ? value.trim() : `${value.slice(0, 50).trim()}...`}</UserProfileDesc>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowMore(!showMore)}>
        <ShowMoreButtonText>{showMore ? messages.showLess : messages.showMore}</ShowMoreButtonText>
      </TouchableOpacity>
    </View>
  );
};

export default ShowMore;
