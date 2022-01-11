import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const EditProfileContainer = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.black};
  padding-right: 15px;
  padding-left: 15px;
`;

export const EditProfileBlock = styled.View`
  align-items: center;
  margin-bottom: 35px;
`;

export const s = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  input: {
    color: colors.white,
    borderColor: colors.white,
  },
});
