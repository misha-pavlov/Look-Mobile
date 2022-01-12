import React, { useCallback, useState } from 'react';
import { Input } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TUserProfile } from '../UserProfile/UserProfile.types';
import { DefaultContainer } from '../../common/common.styles';
import { EditProfileBlock, s } from '../EditProfile/EditProfile.styles';
import { colors } from '../../config/colors';
import PurpleButton from '../../components/PurpleButton/PurpleButton';
import { messages } from '../../config/messages';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { CHANGE_PASSWORD } from './gql/ChangePassword.mutations';

const ChangePassword: React.FC<TUserProfile> = ({ currentUser }) => {
  const [passwords, setPasswords] = useState({ old: '', new: '' });
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mutate] = useMutation(CHANGE_PASSWORD, { onError: error => console.log('CHANGE_PASSWORD = ', error) });
  const { goBack } = useNavigation();

  const handleEdit = (text: string, field: string) => {
    setPasswords({ ...passwords, [field]: text });
  };

  const onPress = useCallback(async () => {
    if (passwords.old !== currentUser.password) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return null;
    }

    await mutate({ variables: { userId: currentUser._id, newPassword: passwords.new } });
    return goBack();
  }, [passwords, currentUser.password]);

  return (
    <>
      {showError && <ErrorPopup text={messages.wrongOldPassword} />}
      <DefaultContainer isWithPaddingTop>
        <EditProfileBlock>
          <Input
            placeholder="Old"
            onChangeText={e => handleEdit(e, 'old')}
            value={passwords.old}
            style={s.input}
            placeholderTextColor={colors.white}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </EditProfileBlock>

        <EditProfileBlock>
          <Input
            placeholder="New"
            rightIcon={
              showPassword ? (
                <MaterialIcons
                  name="visibility-off"
                  size={24}
                  color={colors.gray1}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : (
                <MaterialIcons
                  name="visibility"
                  size={24}
                  color={colors.gray1}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )
            }
            onChangeText={e => handleEdit(e, 'new')}
            value={passwords.new}
            style={s.input}
            secureTextEntry={!showPassword}
            placeholderTextColor={colors.white}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </EditProfileBlock>

        <PurpleButton text={messages.changePassword} onPress={onPress} />
      </DefaultContainer>
    </>
  );
};

export default ChangePassword;
