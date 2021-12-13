import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const PurpleButtonBlock = styled.TouchableOpacity<{ isCreatePostScreen?: boolean }>`
  padding: 15px;
  background-color: ${colors.purple};
  border-radius: 10px;
  ${({ isCreatePostScreen }) => isCreatePostScreen && 'margin: 0 10px 10px 10px'}
`;

export const PurpleButtonText = styled.Text`
  font-size: 15px;
  color: ${colors.white};
  text-align: center;
`;
