import React, { useCallback } from 'react';
import { View } from 'react-native';
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
  UnblockButton,
  UnblockText,
} from './UserProfileHeader.styles';
// constant
import { colors } from '../../../../config/colors';
import { messages } from '../../../../config/messages';
import { screens } from '../../../../config/screens';
import { constants } from '../../../../config/constants';
// gql
import { DO_FOLLOW, UNBLOCK_USER } from '../../../../gql/user/user.mutations';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../../../../gql/user/user.queries';
import { ADD_USER_ACTIVITY } from '../../../../gql/activity/activity.mutations';
import { ADD_CHAT } from '../../../../gql/chat/chat.mutations';
import { GET_USER_CHATS } from '../../../../gql/chat/chat.queries';
// helpers
import { isEqualObjects } from '../../../../helpers/isEqualObjects';
import { isEqualArrays } from '../../../../helpers/isEqualArrays';
// components
import UserImage from '../../../../components/UserImage/UserImage';

const UserProfileHeader: React.FC<TUserProfile> = ({ currentUser, user, chats }) => {
  const { getParent } = useNavigation<NAppNavigatorNavigationProp<'Chat'>>();
  const [mutate] = useMutation(DO_FOLLOW, { onError: error => console.log('DO_FOLLOW UserProfileHeader = ', error) });
  const [unblock] = useMutation(UNBLOCK_USER, {
    onError: error => console.log('UNBLOCK_USER UserProfileHeader = ', error),
  });
  const [activityMutate] = useMutation(ADD_USER_ACTIVITY, {
    onError: error => console.log('ADD_USER_ACTIVITY = ', error),
  });
  const [addChatMutate] = useMutation(ADD_CHAT, {
    onError: e => console.log('ADD_CHAT = ', e),
    onCompleted: result => {
      getParent().navigate(screens.ChatNavigator, {
        screen: screens.Chat,
        params: {
          chatId: result.addChat._id,
          conversationUser: user.userName,
          conversationUserImage: user.img,
          userId: user._id,
        },
      });
    },
  });

  const useUser = user ? user : currentUser;

  const onPressMessage = useCallback(async () => {
    const chat = chats?.filter(c => isEqualArrays(c.members, [user._id, currentUser._id]));
    const userImg = user.img ? user.img : constants.userMock;
    const cUserImg = currentUser.img ? currentUser.img : constants.userMock;

    if (chat?.length > 0) {
      return getParent().navigate(screens.ChatNavigator, {
        screen: screens.Chat,
        params: {
          chatId: chat[0]?._id,
          conversationUser: user.userName,
          conversationUserImage: user.img,
          userId: user._id,
        },
      });
    }

    await addChatMutate({
      variables: {
        title: `${user.userName} ${currentUser.userName}`,
        members: [user._id, currentUser._id],
        groupImage: `${userImg} ${cUserImg}`,
      },
      refetchQueries: [{ query: GET_USER_CHATS, variables: { userId: currentUser._id } }],
    });
  }, [chats, user, currentUser, addChatMutate]);

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

    if (isFollow) {
      await activityMutate({
        variables: {
          actionUserId: currentUser._id,
          targetUserId: followUserId,
        },
      });
    }
  }, []);

  const unblockPress = useCallback(async targetUserId => {
    await unblock({
      variables: { userId: currentUser._id, targetUserId },
      refetchQueries: [
        { query: GET_FOLLOWERS, variables: { userId: targetUserId } },
        { query: GET_FOLLOWING, variables: { userId: targetUserId } },
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

  const showButtons = useCallback(() => {
    if (currentUser.blocked.includes(useUser._id)) {
      return (
        <ButtonsBlock>
          <UnblockButton onPress={() => unblockPress(user._id)}>
            <UnblockText>{messages.unblock}</UnblockText>
          </UnblockButton>
        </ButtonsBlock>
      );
    }

    if (!isEqualObjects(useUser, currentUser)) {
      return (
        <ButtonsBlock>
          <Button isWithMarginRight onPress={onPressMessage}>
            <Ionicons name="chatbubble-outline" size={16} color={colors.white} />
            <ButtonText isWithMarginLeft>{messages.message}</ButtonText>
          </Button>

          <FollowButton followStatus={followStatus} onPress={() => onPressFollow(!followStatus, user._id)}>
            <FollowText followStatus={followStatus}>{followStatus ? messages.following : messages.follow}</FollowText>
          </FollowButton>
        </ButtonsBlock>
      );
    }

    return null;
  }, [currentUser, useUser]);

  return (
    <UserProfileHeaderContainer>
      <UserImage uri={useUser?.img} styles={s.img} />
      <View>
        <UserProfileHeaderUserName>{useUser.userName}</UserProfileHeaderUserName>
        {showRealName()}
        {showButtons()}
      </View>
    </UserProfileHeaderContainer>
  );
};

export default UserProfileHeader;
