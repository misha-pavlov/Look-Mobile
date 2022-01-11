import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Image, Input } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { TUserProfile } from '../UserProfile/UserProfile.types';
import { constants } from '../../config/constants';
import { colors } from '../../config/colors';
import { common } from '../../common/common.styles';
import { EditProfileContainer, EditProfileBlock, s } from './EditProfile.styles';
import { getKeyboardVerticalOffset, keyboardBehaviorDependsOnPlatform } from '../../config/platform';
import { EDIT_PROFILE } from './gql/EditProfile.mutations';

const EditProfile: React.FC<TUserProfile> = ({ currentUser }) => {
  const navigation = useNavigation();
  const [mutate] = useMutation(EDIT_PROFILE, { onError: error => console.log('EDIT_PROFILE = ', error) });

  const [user, setUser] = useState({
    img: currentUser.img,
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    userName: currentUser.userName,
  });

  const handleEdit = (text: string, field: string) => {
    setUser({ ...user, [field]: text });
  };

  useEffect(() => {
    return navigation.addListener('beforeRemove', () =>
      mutate({
        variables: {
          userId: currentUser._id,
          img: user.img,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
        },
      }),
    );
  });

  const keyboardVerticalOffset = getKeyboardVerticalOffset();

  return (
    <ScrollView>
      <EditProfileContainer
        style={common.keyboard}
        behavior={keyboardBehaviorDependsOnPlatform}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <EditProfileBlock>
          <Image
            source={{
              uri: currentUser?.img ? user.img : constants.userMock,
            }}
            style={s.img}
            PlaceholderContent={<ActivityIndicator color={colors.white} />}
            placeholderStyle={common.placeholder}
          />
        </EditProfileBlock>

        <EditProfileBlock>
          <Input
            placeholder="Avatar Url"
            onChangeText={e => handleEdit(e, 'img')}
            value={user.img}
            style={s.input}
            placeholderTextColor={colors.white}
            autoCapitalize="none"
            autoCorrect={false}
            multiline
          />
        </EditProfileBlock>

        <EditProfileBlock>
          <Input
            placeholder="Email"
            onChangeText={e => handleEdit(e, 'email')}
            value={user.email}
            style={s.input}
            placeholderTextColor={colors.white}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </EditProfileBlock>

        <EditProfileBlock>
          <Input
            placeholder="Username"
            onChangeText={e => handleEdit(e, 'userName')}
            value={user.userName}
            style={s.input}
            placeholderTextColor={colors.white}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </EditProfileBlock>

        <EditProfileBlock>
          <Input
            placeholder="First Name"
            onChangeText={e => handleEdit(e, 'firstName')}
            value={user.firstName}
            style={s.input}
            placeholderTextColor={colors.white}
            autoCorrect={false}
          />
        </EditProfileBlock>

        <EditProfileBlock>
          <Input
            placeholder="Last Name"
            onChangeText={e => handleEdit(e, 'lastName')}
            value={user.lastName}
            style={s.input}
            placeholderTextColor={colors.white}
            autoCorrect={false}
          />
        </EditProfileBlock>
      </EditProfileContainer>
    </ScrollView>
  );
};

export default EditProfile;
