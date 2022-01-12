import styled from 'styled-components/native';
import { colors } from '../config/colors';
import { StyleSheet } from 'react-native';

export const CenterBlock = styled.View`
  align-items: center;
`;

export const BlackBlock = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;

export const DefaultContainer = styled.View<{ isWithPaddingTop?: boolean }>`
  flex: 1;
  background-color: ${colors.black};
  padding-right: 15px;
  padding-left: 15px;
  ${({ isWithPaddingTop }) => isWithPaddingTop && 'padding-top: 35px'}
`;

export const common = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.black,
  },
  backImage: {
    marginLeft: 15,
  },
  keyboard: {
    flex: 1,
  },
});
