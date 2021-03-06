import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const ChatsFlexBlock = styled.View<{ withoutSpaceBetween?: boolean; withMarginTop?: boolean }>`
  flex-direction: row;
  align-items: center;
  ${({ withMarginTop }) => withMarginTop && 'margin-top: 15px'};
  ${({ withoutSpaceBetween }) => !withoutSpaceBetween && 'justify-content: space-between;'};
  position: relative;
`;

export const ChatsPlusButton = styled.TouchableOpacity`
  padding-top: 30px;
`;

export const ChatsTitle = styled.Text`
  color: ${colors.white};
  font-weight: 600;
  margin-bottom: 3px;
`;

export const ChatsLastMessage = styled.Text`
  color: ${colors.white};
`;

export const ChatsLastMessageTime = styled.Text`
  color: ${colors.gray};
`;

export const ChatsDivider = styled.View`
  background-color: ${colors.black1};
  height: 1px;
  margin-top: 5px;
  border-radius: 5px;
`;

export const DeleteChat = styled.View`
  background-color: ${colors.black};
  width: 80px;
  height: 70px;
  align-items: center;
  justify-content: center;
`;

export const UnReadDot = styled.View`
  background-color: ${colors.purple1};
  height: 8px;
  width: 8px;
  position: absolute;
  border-radius: 50px;
  top: 0;
  right: 0;
`;

export const sChats = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 15,
  },
});
