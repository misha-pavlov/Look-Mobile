import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
// types
import { TUserProfile } from '../../UserProfile.types';
import { NAppNavigatorNavigationProp } from '../../../../navigation/types/AppNavigator.types';
// styles
import {
  s,
  UserProfileHeaderContainer,
  UserProfileHeaderUserName,
  UserProfileHeaderRealName,
  ButtonsBlock,
  Button,
  ButtonText,
  FollowButton,
  FollowText,
} from './UserProfileHeader.styles';
import { common } from '../../../../common/common.styles';
// constant
import { colors } from '../../../../config/colors';
import { constants } from '../../../../config/constants';
import { messages } from '../../../../config/messages';
import { screens } from '../../../../config/screens';
// graphql
import { DO_FOLLOW } from '../../../../gql/user.mutations';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../CustomProfileTabs/gql/CustomProfileTabs.queries';
// helpers
import { isEqualObjects } from '../../../../helpers/isEqualObjects';

const UserProfileHeader: React.FC<TUserProfile> = ({ currentUser, user }) => {
  const { getParent } = useNavigation<NAppNavigatorNavigationProp<'RecentMessages'>>();
  const [mutate] = useMutation(DO_FOLLOW, { onError: error => console.log('DO_FOLLOW UserProfileHeader = ', error) });

  const useUser = user ? user : currentUser;

  const onPressFollow = useCallback(async (isFollow, followUserId) => {
    await mutate({
      variables: { isFollow, userId: currentUser._id, followUserId },
      refetchQueries: [
        { query: GET_FOLLOWERS, variables: { userId: followUserId } },
        { query: GET_FOLLOWING, variables: { userId: followUserId } },
        { query: GET_FOLLOWERS, variables: { userId: currentUser._id } },
        { query: GET_FOLLOWING, variables: { userId: currentUser._id } },
      ],
    });
  }, []);

  const followStatus = currentUser.following.includes(user._id);

  const showRealName = useCallback(() => {
    if (useUser.firstName && useUser.lastName) {
      return <UserProfileHeaderRealName>{`${useUser.firstName} ${useUser.lastName}`}</UserProfileHeaderRealName>;
    }

    return null;
  }, [useUser]);

  return (
    <UserProfileHeaderContainer>
      <Image
        source={{
          uri: useUser?.img ? useUser?.img : constants.userMock,
        }}
        style={s.img}
        PlaceholderContent={<ActivityIndicator color={colors.white} />}
        placeholderStyle={common.placeholder}
      />

      <View>
        <UserProfileHeaderUserName>{useUser.userName}</UserProfileHeaderUserName>
        {showRealName()}
        {!isEqualObjects(useUser, currentUser) && (
          <ButtonsBlock>
            {/* navigate to chat */}
            <Button
              isWithMarginRight
              onPress={() => getParent().navigate(screens.ChatNavigator, { screen: screens.RecentMessages })}>
              <Ionicons name="chatbubble-outline" size={16} color={colors.white} />
              <ButtonText isWithMarginLeft>{messages.message}</ButtonText>
            </Button>

            <FollowButton followStatus={followStatus} onPress={() => onPressFollow(!followStatus, user._id)}>
              <FollowText followStatus={followStatus}>{followStatus ? messages.following : messages.follow}</FollowText>
            </FollowButton>
          </ButtonsBlock>
        )}
      </View>
    </UserProfileHeaderContainer>
  );
};

export default UserProfileHeader;
