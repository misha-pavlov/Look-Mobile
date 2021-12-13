import styled from 'styled-components/native';
import { colors } from '../../config/colors';
import { StyleSheet } from 'react-native';

export const CreatePostBlock = styled.ScrollView`
  flex: 1;
  background-color: ${colors.black};
`;

export const GrayBlock = styled.View<{ isTextInputWrapper?: boolean }>`
  background-color: ${colors.gray};
  border-radius: 10px;
  padding: ${({ isTextInputWrapper }) => (isTextInputWrapper ? '13px 30px 15px 30px' : '15px 30px')};
  margin: 15px 10px 35px 10px;
  flex-direction: row;
  align-items: center;
`;

export const UserText = styled.Text`
  color: ${colors.white};
  margin-left: 12px;
  font-weight: 600;
`;

export const TagsBlock = styled.View`
  margin: 0 10px 10px 10px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

export const AddTagsButton = styled.TouchableOpacity`
  background-color: ${colors.black};
`;

export const AddTagsText = styled.Text`
  color: ${colors.gray};
  text-transform: uppercase;
`;

export const TagBlock = styled.TouchableOpacity`
  background-color: ${colors.black1};
  border-radius: 50px;
  padding: 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const TagText = styled.Text`
  font-size: 12px;
  color: ${colors.white};
`;

export const UrlIsNotImage = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 35px;
`;

export const s = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  input: {
    color: colors.white,
  },
});
