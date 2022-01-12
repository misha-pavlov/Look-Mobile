import React, { useState } from 'react';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PushNotificationBlock, SettingItemText, SettingItemTouchable } from './UserSettings.styles';
import { messages } from '../../config/messages';
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';
import { DefaultContainer } from '../../common/common.styles';

const UserSettings = () => {
  const { navigate } = useNavigation<NAppNavigatorNavigationProp<'EditProfile'>>();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <DefaultContainer>
      <SettingItemTouchable onPress={() => navigate(screens.EditProfile)}>
        <SettingItemText>{messages.editProfile}</SettingItemText>
      </SettingItemTouchable>

      <SettingItemTouchable onPress={() => navigate(screens.ChangePassword)}>
        <SettingItemText>{messages.changePassword}</SettingItemText>
      </SettingItemTouchable>

      <SettingItemTouchable>
        <SettingItemText>{messages.blockedUsers}</SettingItemText>
      </SettingItemTouchable>

      <PushNotificationBlock>
        <SettingItemTouchable disabled isOffMarginTop>
          <SettingItemText>{messages.pushNotifications}</SettingItemText>
        </SettingItemTouchable>

        <Switch
          trackColor={{ false: colors.black1, true: colors.purple }}
          thumbColor={isEnabled ? colors.white : colors.gray3}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
        />
      </PushNotificationBlock>

      <SettingItemTouchable isBigMargin>
        <SettingItemText>{messages.signOut}</SettingItemText>
      </SettingItemTouchable>
    </DefaultContainer>
  );
};

export default UserSettings;
