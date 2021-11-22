import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const BackBlock = styled.TouchableOpacity`
  margin-top: 55px;
`;

export const SignUpBlock = styled.ScrollView`
  background-color: ${colors.black};
  flex: 1;
  padding-left: 25px;
  padding-right: 25px;
`;

export const WelcomeText = styled.Text`
  color: ${colors.white};
  margin-top: 40px;
  margin-bottom: 70px;
  font-size: 30px;
`;
