import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const UserProfileContainer = styled.View`
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

export const s = StyleSheet.create({
  settings: {
    marginRight: 15,
    marginTop: 10,
  },
});
