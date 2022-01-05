import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const FollowButtonContainer = styled.TouchableOpacity<{ followStatus?: boolean }>`
  border: 1px solid ${colors.purple};
  border-radius: 8px;
  padding: 5px;
  background-color: ${({ followStatus }) => (followStatus ? colors.black : colors.purple)};
`;

export const FollowButtonText = styled.Text<{ followStatus?: boolean }>`
  color: ${({ followStatus }) => (followStatus ? colors.purple : colors.black)};
  font-weight: 600;
`;
