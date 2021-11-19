import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const StartBlock = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${colors.black};
  padding: 0 16px;
`;

export const StartText = styled.Text`
  font-size: 45px;
  color: ${colors.white};
  text-align: center;
  margin-bottom: 150px;
`;

export const TextBlock = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GrayText = styled.Text`
  font-size: 13px;
  color: ${colors.gray};
  text-align: center;
  text-transform: uppercase;
`;

export const PurpleText = styled.Text`
  font-size: 13px;
  color: ${colors.purple};
  text-align: center;
  text-transform: uppercase;
  padding-left: 5px;
`;
