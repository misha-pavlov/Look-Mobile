import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const ChatBlock = styled.View<{ isMyMessage: boolean }>`
  border-radius: 10px;
  background-color: ${({ isMyMessage }) => (isMyMessage ? colors.purple3 : colors.black4)};
  padding: 10px;
  margin-top: 10px;
`;

export const ChatBlockContainer = styled.View<{ isMyMessage: boolean }>`
  align-items: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
`;

export const ChatText = styled.Text`
  color: ${colors.white};
`;
