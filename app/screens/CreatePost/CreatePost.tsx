import React, { useState } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { Image } from 'react-native-elements';
import {
  AddTagsButton,
  CreatePostBlock,
  GrayBlock,
  s,
  UserText,
  AddTagsText,
  TagsBlock,
  TagBlock,
  TagText,
  UrlIsNotImage,
} from './CreatePost.styles';
import { withCurrentUser } from '../../hocs/withCurrentUser';
import { User } from '../../types/graphql';
import { colors } from '../../config/colors';
import { common } from '../../common/common.styles';
import { messages } from '../../config/messages';
import PurpleButton from '../../components/PurpleButton/PurpleButton';
import { isImageUrl } from '../../helpers/isImageUrl';

const CreatePost = (currentUser?: { currentUser?: User }) => {
  const [postText, setPostText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleEdit = (text: string) => {
    setPostText(text);
  };

  const handleEditImageUrl = (text: string) => {
    setImageUrl(text);
  };

  return (
    <CreatePostBlock>
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
        <TagBlock>
          <TagText>#testTag</TagText>
        </TagBlock>

        <AddTagsButton>
          <AddTagsText>{messages.addTags}</AddTagsText>
        </AddTagsButton>
      </TagsBlock>

      <GrayBlock isTextInputWrapper>
        <TextInput
          placeholder="Enter post image"
          onChangeText={e => handleEditImageUrl(e)}
          value={imageUrl}
          style={s.input}
          placeholderTextColor={colors.white}
          multiline
        />
      </GrayBlock>

      {/* Preview Image */}
      {isImageUrl(imageUrl) ? (
        <Image source={{ uri: imageUrl }} style={{ height: 500, marginHorizontal: 10, marginBottom: 35 }} />
      ) : (
        <UrlIsNotImage>{messages.urlIsNotImage}</UrlIsNotImage>
      )}

      <PurpleButton text={messages.createPost} onPress={() => console.log('post')} isCreatePostScreen />
    </CreatePostBlock>
  );
};

export default withCurrentUser(CreatePost);
