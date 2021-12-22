import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../../../config/colors';

export const PurpleInput = styled.TextInput`
  border: 1px solid ${colors.purple};
  color: ${colors.white};
  border-radius: 10px;
  width: ${Dimensions.get('screen').width * 0.55}px;
  padding: 10px;
`;

export const AddDescriptionBlock = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
