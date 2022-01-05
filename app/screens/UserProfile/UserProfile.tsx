import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
// types
import { TUserProfile } from './UserProfile.types';
import { NAppNavigatorNavigationProp, NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';
// styles
import { s, UserProfileContainer } from './UserProfile.styles';
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
// helpers
import { isEqualObjects } from '../../helpers/isEqualObjects';

const UserProfile: React.FC<TUserProfile> = ({ currentUser }) => {
  const navigation = useNavigation<NAppNavigatorNavigationProp<'UserSettings'>>();
  const route = useRoute<NAppNavigatorRouteProp<'UserProfile'>>();

  const user = route.params?.user ? route.params?.user : currentUser;

  const [showInput, setShowInput] = useState(false);
  const onPress = () => setShowInput(!showInput);

  const description = useCallback(() => {
    if (isEqualObjects(user, currentUser)) {
      if (showInput) {
        return <AddDescription value={user.description} userId={user._id} onPress={onPress} />;
      } else {
        if (user.description === '' || !user.description) {
          return <AddButtonText text={messages.addDesc} onPress={onPress} />;
        }

        return <ShowMore value={user.description} onPress={onPress} />;
      }
    }

    return <ShowMore value={user.description} onPress={onPress} disabled />;
  }, [user, showInput]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEqualObjects(user, currentUser) && (
          <TouchableOpacity onPress={() => navigation.navigate(screens.UserSettings)}>
            <Ionicons name="settings-outline" size={25} style={s.settings} color={colors.white} />
          </TouchableOpacity>
        ),
    });
  }, [user, currentUser]);

  return (
    <UserProfileContainer>
      <UserProfileHeader currentUser={user} />
      {description()}
      <CustomProfileTabsContainer user={user} currentUser={currentUser} />
    </UserProfileContainer>
  );
};

export default UserProfile;
