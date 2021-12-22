import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const AddTagsButton = styled.TouchableOpacity`
  background-color: ${colors.black};
`;

export const AddTagsText = styled.Text<{ isHide?: boolean }>`
  color: ${({ isHide }) => (isHide ? colors.pink : colors.gray)};
  text-transform: uppercase;
`;
