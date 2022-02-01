import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

export const ItemContainer = styled.View`
  margin-bottom: 55px;
`;

export const ItemAvatarBlock = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled.Text`
  color: ${colors.white};
`;

export const ItemTime = styled.Text`
  color: ${colors.gray1};
`;

export const ItemDescBlock = styled.View`
  margin: 15px 0;
`;

export const ShowAllText = styled.Text`
  color: ${colors.purple};
`;

export const s = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 15,
  },

  postImg: {
    width: '100%',
    height: 400,
    marginTop: 15,
  },
});
