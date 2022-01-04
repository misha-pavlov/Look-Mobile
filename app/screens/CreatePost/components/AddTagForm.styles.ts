import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../../config/colors';

export const AddTagBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 98%;
`;

export const AddTagInput = styled.TextInput`
  border-radius: 50px;
  border: 1px solid ${colors.purple};
  width: ${Dimensions.get('screen').width - 150}px;
  padding: 10px;
  color: ${colors.white};
`;

export const AddTagButton = styled.TouchableOpacity`
  background-color: ${colors.black};
`;

export const AddTagText = styled.Text`
  color: ${colors.purple};
  font-size: 17px;
`;
