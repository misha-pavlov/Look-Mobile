import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../../../../config/colors';

export const UserBlock = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const UserImageAndName = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
`;

export const s = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
    marginRight: 15,
    borderRadius: 50,
  },
});
