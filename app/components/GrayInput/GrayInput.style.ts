import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const GrayInputBlock = styled.View<{ isMessagesInput: boolean }>`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.black2};
  padding: 10px;
  border-radius: 8px;
  ${({ isMessagesInput }) => isMessagesInput && 'margin-bottom: 10px'}
`;

export const Input = styled.TextInput<{ isMessagesInput: boolean }>`
  color: ${colors.white};
  margin-right: 15px;
  width: ${({ isMessagesInput }) => (isMessagesInput ? 88 : 77)}%;
`;

export const s = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 15,
  },
});
