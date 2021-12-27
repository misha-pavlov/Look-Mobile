import styled from 'styled-components/native';
import { colors } from '../../../../../../config/colors';

export const TabName = styled.Text<{ isActive?: boolean }>`
  text-transform: uppercase;
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray)};
  font-weight: 600;
  margin-top: 5px;
`;

export const TabCount = styled.Text<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray)};
  font-weight: 600;
  font-size: 20px;
`;
