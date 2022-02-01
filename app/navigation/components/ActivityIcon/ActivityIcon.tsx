import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../config/colors';
import { Bullet, IconBlock } from './ActivityIcon.styles';

const ActivityIcon = ({ showBullet, focused }: { showBullet: boolean; focused: boolean }) => {
  return (
    <IconBlock>
      {showBullet && <Bullet />}
      <AntDesign name="hearto" size={25} color={focused ? colors.purple1 : colors.gray1} />
    </IconBlock>
  );
};

export default ActivityIcon;
