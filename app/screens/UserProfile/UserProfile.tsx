import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
// types
import { TUserProfile } from './UserProfile.types';
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';
// styles
import { UserProfileContainer } from './UserProfile.styles';
// components
import UserProfileHeader from './components/UserProfileHeader/UserProfileHeader';
import ShowMore from './components/ShowMore/ShowMore';
import AddButtonText from '../../components/AddButtonText/AddButtonText';
import AddDescription from './components/AddDescription/AddDescription';
import { CustomProfileTabsContainer } from './components/CustomProfileTabs/CustomProfileTabsContainer';
// constants
import { messages } from '../../config/messages';
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';

const UserProfile: React.FC<TUserProfile> = ({ currentUser }) => {
  const navigation = useNavigation<NAppNavigatorNavigationProp<'UserSettings'>>();
  const [showInput, setShowInput] = useState(false);
  const onPress = () => setShowInput(!showInput);

  const description = useCallback(() => {
    if (showInput) {
      return <AddDescription value={currentUser.description} userId={currentUser._id} onPress={onPress} />;
    } else {
      if (currentUser.description === '') {
        return <AddButtonText text={messages.addDesc} onPress={onPress} />;
      }

      return <ShowMore value={currentUser.description} onPress={onPress} />;
    }
  }, [currentUser, showInput]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate(screens.UserSettings)}>
          <Ionicons name="settings-outline" size={25} style={{ marginRight: 10, marginTop: 10 }} color={colors.white} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <UserProfileContainer>
      <UserProfileHeader currentUser={currentUser} />
      {description()}
      <CustomProfileTabsContainer />
    </UserProfileContainer>
  );
};

export default UserProfile;
