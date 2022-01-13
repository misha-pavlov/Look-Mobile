import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/colors';

export const UserProfileHeaderContainer = styled.View`
  padding: 25px 0;
  flex-direction: row;
  align-items: center;
`;

export const UserProfileHeaderUserName = styled.Text`
  color: ${colors.white};
  font-size: 25px;
  font-weight: 600;
`;

export const UserProfileHeaderRealName = styled.Text`
  color: ${colors.gray1};
`;

export const ButtonsBlock = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const Button = styled.TouchableOpacity<{ isWithMarginRight?: boolean }>`
  padding: 10px;
  background-color: ${colors.purple};
  border-radius: 10px;
  flex-direction: row;
  ${({ isWithMarginRight }) => isWithMarginRight && 'margin-right: 10px'}
`;

export const ButtonText = styled.Text<{ isWithMarginLeft?: boolean }>`
  color: ${colors.white};
  text-align: center;
  ${({ isWithMarginLeft }) => isWithMarginLeft && 'margin-left: 5px'}
`;

export const FollowButton = styled.TouchableOpacity<{ followStatus?: boolean }>`
  border: 1px solid ${colors.purple};
  border-radius: 8px;
  padding: 10px;
  background-color: ${({ followStatus }) => (followStatus ? colors.black : colors.purple)};
`;

export const FollowText = styled.Text<{ followStatus?: boolean }>`
  color: ${({ followStatus }) => (followStatus ? colors.purple : colors.white)};
  font-weight: 600;
`;

export const s = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 30,
  },
});
