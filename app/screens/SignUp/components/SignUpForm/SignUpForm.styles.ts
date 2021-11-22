import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../../config/colors';

export const s = StyleSheet.create({
  input: {
    color: colors.white,
    borderColor: colors.white,
  },
});

export const InputBlock = styled.View`
  margin-bottom: 30px;
`;
