import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';
import { Image } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
// styles
import {
  GrayBlock,
  s,
  UserText,
  TagsBlock,
  TagBlock,
  TagText,
  UrlIsNotImage,
  BottomSheetBlock,
  BottomSheetHide,
  BottomSheetHideBlock,
  TagTextBlock,
  TagDelete,
  CustomBottomSheet,
} from './CreatePost.styles';
import { common, DefaultContainer } from '../../common/common.styles';
import { AddTagsText } from '../../components/AddButtonText/AddButtonText.styles';
// hocs
import { withCurrentUser } from '../../hocs/withCurrentUser';
// types
import { User } from '../../types/graphql';
import { TTags } from '../../types/customTypes';
// constants
import { colors } from '../../config/colors';
import { messages } from '../../config/messages';
// components
import PurpleButton from '../../components/PurpleButton/PurpleButton';
import AddTagForm from './components/AddTagForm';
import AddButtonText from '../../components/AddButtonText/AddButtonText';
// helpers
import { isImageUrl } from '../../helpers/isImageUrl';
import { getKeyboardVerticalOffset, keyboardBehaviorDependsOnPlatformForAddTag } from '../../config/platform';
// gql
import { CREATE_POST } from './gql/CreatePosts.mutations';

const CreatePost = (currentUser?: { currentUser?: User }) => {
  const navigation = useNavigation();
  const [postText, setPostText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [tags, setTags] = useState<{ tags: TTags }>({ tags: [] });

  const [mutate] = useMutation(CREATE_POST, {
    onError: error => console.log('CREATE_POST = ', error),
  });

  const deleteTag = (_id: string) => {
    const newTags = tags.tags.filter(t => t._id !== _id);
    setTags({ tags: newTags });
  };

  const getTags = () => {
    return tags.tags.map(t => {
      const isTag = t.title.charAt(0) === '#';
      return (
        <TagBlock key={t._id}>
          <TagTextBlock>
            <TagText>{isTag ? t.title : `#${t.title}`}</TagText>
          </TagTextBlock>

          <TagDelete onPress={() => deleteTag(t._id)}>
            <EvilIcons name="close" size={16} color={colors.white} />
          </TagDelete>
        </TagBlock>
      );
    });
  };

  const handleEdit = (text: string) => {
    setPostText(text);
  };

  const handleEditImageUrl = (text: string) => {
    setImageUrl(text);
  };

  const handleSubmit = () => {
    const userId = currentUser?.currentUser?._id;
    if (userId) {
      mutate({
        variables: { userId, title: postText, img: imageUrl, tags: tags.tags },
      });
      navigation.goBack();
    }
  };

  const keyboardVerticalOffset = getKeyboardVerticalOffset();

  return (
    <DefaultContainer>
      <GrayBlock>
        <Image
          source={{
            uri: currentUser?.currentUser?.img,
          }}
          style={s.img}
          PlaceholderContent={<ActivityIndicator color={colors.white} />}
          placeholderStyle={common.placeholder}
        />
        <UserText>{currentUser?.currentUser?.userName}</UserText>
      </GrayBlock>

      <GrayBlock isTextInputWrapper>
        <TextInput
          placeholder="Enter post text"
          onChangeText={e => handleEdit(e)}
          value={postText}
          style={s.input}
          placeholderTextColor={colors.white}
          multiline
        />
      </GrayBlock>

      <TagsBlock>
        {getTags()}
        <AddButtonText text={messages.addTags} onPress={() => setIsVisible(!isVisible)} />
      </TagsBlock>

      <GrayBlock isTextInputWrapper>
        <TextInput
          placeholder="Enter post image"
          onChangeText={e => handleEditImageUrl(e)}
          value={imageUrl}
          style={s.input}
          placeholderTextColor={colors.white}
          multiline
          autoCorrect={false}
          autoCapitalize="none"
        />
      </GrayBlock>

      {/* Preview Image */}
      {isImageUrl(imageUrl) ? (
        <Image source={{ uri: imageUrl }} style={{ height: 500, marginHorizontal: 10, marginBottom: 35 }} />
      ) : (
        <UrlIsNotImage>{messages.urlIsNotImage}</UrlIsNotImage>
      )}

      <PurpleButton text={messages.createPost} onPress={handleSubmit} isCreatePostScreen />

      {/* Bottom sheet with add tag */}
      <CustomBottomSheet isVisible={isVisible}>
        <KeyboardAvoidingView
          style={common.keyboard}
          behavior={keyboardBehaviorDependsOnPlatformForAddTag}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <BottomSheetBlock>
            <BottomSheetHideBlock>
              <BottomSheetHide onPress={() => setIsVisible(!isVisible)}>
                <AddTagsText isHide>{messages.hide}</AddTagsText>
              </BottomSheetHide>
            </BottomSheetHideBlock>
            <AddTagForm setTags={setTags} tags={tags?.tags} />
          </BottomSheetBlock>
        </KeyboardAvoidingView>
      </CustomBottomSheet>
    </DefaultContainer>
  );
};

export default withCurrentUser(CreatePost);
