import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const SearchBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InputBox = styled.View<{ showCancel: boolean }>`
  width: ${({ showCancel }) => (showCancel ? 80 : 100)}%;
`;

export const CancelText = styled.Text`
  font-size: 16px;
  color: ${colors.white};
  padding: 10px;
`;

export const s = StyleSheet.create({
  inputContainer: {
    borderRadius: 8,
    backgroundColor: colors.black2,
    borderBottomColor: colors.black2,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -23,
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    color: colors.white,
    fontSize: 14,
  },
});
