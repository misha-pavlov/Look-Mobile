import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const PostsBlock = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;

export const PlusButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 20px;
  width: 65px;
  height: 65px;
  border-radius: 50px;
  background-color: ${colors.purple1};
  align-items: center;
  justify-content: center;
`;

export const s = StyleSheet.create({
  shadow: {
    shadowColor: colors.purple2,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
