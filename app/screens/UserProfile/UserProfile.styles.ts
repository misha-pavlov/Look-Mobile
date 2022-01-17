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

export const Popup = styled.View`
  background-color: ${colors.gray4};
  width: 125px;
  position: absolute;
  top: 15px;
  right: 35px;
  border-radius: 8px;
`;

export const RedText = styled.Text`
  color: ${colors.red};
  text-align: center;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const s = StyleSheet.create({
  settings: {
    marginRight: 15,
    marginTop: 10,
  },
});
