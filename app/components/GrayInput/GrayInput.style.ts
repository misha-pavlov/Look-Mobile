import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const GrayInputBlock = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.black2};
  padding: 10px;
  border-radius: 8px;
`;

export const Input = styled.TextInput`
  color: ${colors.white};
  margin-right: 15px;
  width: 77%;
`;

export const s = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 15,
  },
});
