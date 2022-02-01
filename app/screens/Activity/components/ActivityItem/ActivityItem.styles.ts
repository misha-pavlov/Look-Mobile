import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/colors';

export const ActivityBlock = styled.View<{ isCommentActivity?: boolean }>`
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  ${({ isCommentActivity }) => isCommentActivity && 'align-items: center;'}
`;

export const FlexBlock = styled.View<{ isCommentActivity?: boolean }>`
  flex-direction: row;
  ${({ isCommentActivity }) => isCommentActivity && 'align-items: center;'}
`;

export const DateMessageText = styled.Text`
  color: ${colors.gray};
`;

export const UserNameCommentText = styled.Text`
  color: ${colors.white};
  margin-right: 5px;
  font-weight: 600;
`;

export const s = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 15,
  },
  postImg: {
    marginTop: 10,
    width: 150,
    height: 150,
  },
});
