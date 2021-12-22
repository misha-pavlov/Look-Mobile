import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const UserProfileContainer = styled.ScrollView`
  flex: 1;
  background-color: ${colors.black};
  padding: 0 20px;
`;

export const UserProfileDesc = styled.Text`
  color: ${colors.white};
`;

export const ShowMoreButtonText = styled.Text`
  color: ${colors.purple};
`;
