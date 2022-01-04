import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/colors';

export const CommentBlock = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

export const CommentText = styled.Text`
  color: ${colors.white};
  padding-right: 30px;
`;

export const s = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 10,
  },
});
