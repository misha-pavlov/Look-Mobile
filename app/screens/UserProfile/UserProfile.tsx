import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';
// types
import { TUserProfile } from './UserProfile.types';
import { NAppNavigatorNavigationProp, NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';
// styles
import { Popup, RedText, s, UserProfileContainer } from './UserProfile.styles';
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
// gql
import { BLOCK_USER } from './gql/UserProfile.mutations';
import { GET_FOLLOWERS, GET_FOLLOWING } from './components/CustomProfileTabs/gql/CustomProfileTabs.queries';

const UserProfile: React.FC<TUserProfile> = ({ currentUser }) => {
  const navigation = useNavigation<NAppNavigatorNavigationProp<'UserSettings'>>();
  const route = useRoute<NAppNavigatorRouteProp<'UserProfile'>>();
  const [mutate] = useMutation(BLOCK_USER, { onError: error => console.log('BLOCK_USER = ', error) });

  const [popup, setPopup] = useState(false);
  const popupVisible = () => setPopup(!popup);

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

  const blockUser = useCallback(async () => {
    await mutate({
      variables: {
        userId: currentUser._id,
        targetUserId: user._id,
      },
      refetchQueries: [
        { query: GET_FOLLOWERS, variables: { userId: user._id } },
        { query: GET_FOLLOWING, variables: { userId: user._id } },
        { query: GET_FOLLOWERS, variables: { userId: currentUser._id } },
        { query: GET_FOLLOWING, variables: { userId: currentUser._id } },
      ],
    });
  }, [mutate, user, currentUser]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (isEqualObjects(user, currentUser)) {
          return (
            <TouchableOpacity onPress={() => navigation.navigate(screens.UserSettings)}>
              <Ionicons name="settings-outline" size={25} style={s.settings} color={colors.white} />
            </TouchableOpacity>
          );
        }

        return (
          <>
            <TouchableOpacity onPress={popupVisible}>
              <Entypo name="dots-three-vertical" size={20} style={s.settings} color={colors.white} />
            </TouchableOpacity>

            {popup && (
              <Popup>
                <TouchableOpacity
                  onPress={async () => {
                    await blockUser();
                    popupVisible();
                  }}>
                  <RedText>{messages.block}</RedText>
                </TouchableOpacity>
              </Popup>
            )}
          </>
        );
      },
    });
  }, [user, currentUser, popup]);

  return (
    <UserProfileContainer>
      <UserProfileHeader user={!isEqualObjects(user, currentUser) && user} currentUser={currentUser} />
      {description()}
      <CustomProfileTabsContainer user={user} currentUser={currentUser} />
    </UserProfileContainer>
  );
};

export default UserProfile;
