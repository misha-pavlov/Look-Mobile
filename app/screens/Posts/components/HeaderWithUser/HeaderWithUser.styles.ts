import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/colors';

export const HeaderWithUserBlock = styled.View`
  background-color: ${colors.black};
  height: 100px;
  padding-left: 25px;
  padding-top: 40px;
`;

export const UserNameText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
`;

export const HeaderWithUserTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const s = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 15,
  },
  placeholder: {
    backgroundColor: colors.black,
  },
});
