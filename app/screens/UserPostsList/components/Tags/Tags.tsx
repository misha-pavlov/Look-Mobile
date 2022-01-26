import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Tag } from '../../../../types/graphql';
import { TagBlock, TagsContainer, TagText } from './Tags.styles';
import { screens } from '../../../../config/screens';
import { SearchTabsEnum } from '../../../../types/customTypes';

const Tags = ({ tags }: { tags: Tag[] }) => {
  const { getParent } = useNavigation();

  const getTags = () => {
    return tags.map(t => {
      const [isActive, setIsActive] = useState(false);
      const isTag = t.title.charAt(0) === '#';

      return (
        <TagBlock
          onPress={() =>
            getParent().navigate(screens.SearchNavigator, {
              screen: screens.Search,
              params: { startTab: SearchTabsEnum.Tags, tag: t.title },
            })
          }
          key={t._id}
          isActive={isActive}
          activeOpacity={1}
          onPressIn={() => setIsActive(true)}
          onPressOut={() => setIsActive(false)}>
          <TagText isActive={isActive}>{isTag ? t.title : `#${t.title}`}</TagText>
        </TagBlock>
      );
    });
  };

  return <TagsContainer>{getTags()}</TagsContainer>;
};

export default Tags;
