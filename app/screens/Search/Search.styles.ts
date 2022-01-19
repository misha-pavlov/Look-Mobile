import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const SearchBox = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  margin-bottom: -15px;
`;

export const InputBox = styled.View<{ showCancel: boolean }>`
  width: ${({ showCancel }) => (showCancel ? 80 : 100)}%;
  padding-top: 25px;
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
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    color: colors.white,
    fontSize: 14,
  },
});
