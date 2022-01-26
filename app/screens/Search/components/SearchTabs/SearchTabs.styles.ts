import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/colors';

export const PostsBlock = styled.View`
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const UsersBlock = styled.View`
  margin-top: 10px;
`;

export const EmptyList = styled.Text`
  font-size: 17px;
  color: ${colors.gray};
  text-align: center;
`;

export const s = StyleSheet.create({
  tab: {
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 14,
  },
  tabView: {
    backgroundColor: colors.black,
  },
  divider: {
    backgroundColor: colors.purple,
    borderRadius: 25,
    height: 2,
  },
});
