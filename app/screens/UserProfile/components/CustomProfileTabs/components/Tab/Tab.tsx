import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TabCount, TabName } from './Tab.styles';
import { TTab } from './Tab.types';

const Tab: React.FC<TTab> = ({ onPress, isActive, count, name }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <TabCount isActive={isActive}>{count}</TabCount>
      <TabName isActive={isActive}>{name}</TabName>
    </TouchableOpacity>
  );
};

export default Tab;
