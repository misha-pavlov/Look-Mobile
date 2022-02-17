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

export const ReplyBlock = styled.View`
  background-color: ${colors.black1};
  padding: 10px;
  margin-bottom: -5px;
  margin-top: 10px;
  border-radius: 8px;
  position: relative;
`;

export const ReplyText = styled.Text`
  color: ${colors.white};
  max-width: 90%;
`;

export const CancelReplyBlock = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const s = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 15,
  },
});
