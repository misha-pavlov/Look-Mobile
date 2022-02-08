import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/colors';

export const ChatHeaderBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
`;

export const LeftSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserNameText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
`;

export const s = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 15,
  },
  backImage: {
    marginLeft: -9,
    marginRight: 15,
  },
});
