import React, { useState } from 'react';
import { Tag } from '../../../../types/graphql';
import { TagBlock, TagsContainer, TagText } from './Tags.styles';

const Tags = ({ tags }: { tags: Tag[] }) => {
  const getTags = () => {
    return tags.map(t => {
      const [isActive, setIsActive] = useState(false);
      const isTag = t.title.charAt(0) === '#';

      return (
        <TagBlock
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
