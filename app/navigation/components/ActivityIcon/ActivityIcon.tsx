import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { colors } from '../../../config/colors';
import { Bullet, IconBlock } from './ActivityIcon.styles';

const ActivityIcon = ({
  showBullet,
  focused,
  isChatIcon,
}: {
  showBullet: boolean;
  focused: boolean;
  isChatIcon?: boolean;
}) => {
  return (
    <IconBlock>
      {showBullet && <Bullet />}
      {isChatIcon ? (
        <Ionicons name="chatbubble-outline" size={25} color={focused ? colors.purple1 : colors.gray1} />
      ) : (
        <AntDesign name="hearto" size={25} color={focused ? colors.purple1 : colors.gray1} />
      )}
    </IconBlock>
  );
};

export default ActivityIcon;
