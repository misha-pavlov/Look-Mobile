import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { colors } from '../../../../config/colors';

export const TabsBlock = styled.View`
  margin-left: 15px;
  margin-right: 15px;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px; ;
`;

export const Divider = styled(Animated.View)`
  background-color: ${colors.purple};
  border-radius: 25px;
  height: 2px;
  width: 20px;
  margin-top: 8px;
`;
