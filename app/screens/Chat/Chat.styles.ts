import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const ChatBlock = styled.TouchableOpacity<{ isMyMessage: boolean; isEditMode: boolean }>`
  border-radius: 10px;
  background-color: ${({ isMyMessage, isEditMode }) => {
    if (isEditMode) {
      return colors.pink;
    }
    return isMyMessage ? colors.purple3 : colors.black4;
  }};
  padding: 10px;
  margin-top: 10px;
  z-index: 100;
`;

export const ChatBlockContainer = styled.View<{ isMyMessage: boolean }>`
  align-items: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
`;

export const ChatText = styled.Text`
  color: ${colors.white};
`;

export const OptionsBlock = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const OptionsButton = styled.TouchableOpacity<{ isCloseOptions?: boolean }>`
  border: 1px solid ${({ isCloseOptions }) => (isCloseOptions ? colors.purple3 : colors.pink)};
  border-radius: 8px;
  padding: 8px;
`;

export const OptionsText = styled.Text<{ isCloseOptions?: boolean }>`
  color: ${({ isCloseOptions }) => (isCloseOptions ? colors.purple3 : colors.pink)};
`;

export const OptionsDivider = styled.View`
  background-color: ${colors.white};
  height: 1px;
  margin-top: 10px;
  width: 100px;
  align-self: center;
`;
