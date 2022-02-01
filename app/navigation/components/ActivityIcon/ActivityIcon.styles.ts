import styled from 'styled-components/native';
import { colors } from '../../../config/colors';

export const IconBlock = styled.View`
  position: relative;
`;

export const Bullet = styled.View`
  background-color: ${colors.purple1};
  height: 5px;
  width: 5px;
  border-radius: 50px;
  position: absolute;
  right: -7px;
  top: -5px;
`;
