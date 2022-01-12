import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const ErrorContainer = styled.View`
  background-color: ${colors.black};
`;

export const ErrorBlock = styled.View`
  background-color: ${colors.red};
  margin-left: 15px;
  margin-right: 15px;
  padding: 15px;
  border-radius: 10px;
`;

export const ErrorText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
  text-align: center;
`;
