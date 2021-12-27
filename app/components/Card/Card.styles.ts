import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const CardBlock = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

export const CardTitle = styled.Text`
  color: ${colors.white};
  margin-top: 5px;
`;

export const s = StyleSheet.create({
  img: {
    width: 150,
    height: 150,
  },
});
