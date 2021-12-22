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

export const s = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 30,
  },
});
