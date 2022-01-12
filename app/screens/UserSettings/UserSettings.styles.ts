import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const SettingItemTouchable = styled.TouchableOpacity<{ isOffMarginTop?: boolean; isBigMargin?: boolean }>`
  ${({ isOffMarginTop }) => !isOffMarginTop && 'margin-top: 25px'};
  ${({ isBigMargin }) => isBigMargin && 'margin-top: 45px'};
`;

export const SettingItemText = styled.Text`
  color: ${colors.white};
  font-size: 17px;
  font-weight: 600;
`;

export const PushNotificationBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
`;
