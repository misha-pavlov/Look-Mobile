import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const PurpleButtonBlock = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${colors.purple};
  border-radius: 10px;
`;

export const PurpleButtonText = styled.Text`
  font-size: 15px;
  color: ${colors.white};
  text-align: center;
`;
