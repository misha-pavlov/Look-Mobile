import styled from 'styled-components/native';
import { colors } from '../../../../config/colors';

export const TagBlock = styled.TouchableOpacity<{ isActive: boolean }>`
  background-color: ${colors.black1};
  border-radius: 15px;
  padding: 5px 10px;
  margin-right: 10px;
  margin-top: 15px;
  border: ${({ isActive }) => (isActive ? `1px solid ${colors.purple}` : `1px solid ${colors.black1}`)};
`;

export const TagText = styled.Text<{ isActive: boolean }>`
  font-size: 14px;
  color: ${({ isActive }) => (isActive ? colors.purple : colors.white)};
`;

export const TagsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;
