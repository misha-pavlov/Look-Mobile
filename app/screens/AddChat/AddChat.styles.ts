import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const UserRow = styled.TouchableOpacity`
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
`;

export const UserNameText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
`;

export const s = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 15,
  },
});
