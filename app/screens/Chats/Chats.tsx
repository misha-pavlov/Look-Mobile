import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableOpacity, View, Animated } from 'react-native';
import AnimatedInterpolation = Animated.AnimatedInterpolation;
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
// styles
import { DefaultContainer } from '../../common/common.styles';
import {
  ChatsDivider,
  ChatsFlexBlock,
  ChatsLastMessage,
  ChatsLastMessageTime,
  ChatsPlusButton,
  ChatsTitle,
  DeleteChat,
  sChats,
  UnReadDot,
} from './Chats.styles';
// components
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import UserImage from '../../components/UserImage/UserImage';
import Spinner from '../../components/Spinner/Spinner';
import GraySearchInput from '../../components/GraySearchInput/GraySearchInput';
// constants
import { screens } from '../../config/screens';
import { colors } from '../../config/colors';
// types
import { TChats } from './Chats.types';
import { Chats as ChatsType } from '../../types/graphql';
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';
import { GET_USER_CHATS } from './gql/Chats.queries';

const Chats: React.FC<TChats> = ({ loading, currentUser, chats, searchChat, searchChats, deleteChat }) => {
  const { navigate } = useNavigation<NAppNavigatorNavigationProp<'AddChat'>>();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const showCancel = searchText?.length > 0;

  useEffect(() => {
    searchChat({
      variables: {
        title: searchText,
      },
    });
  }, [searchText, searchChat]);

  const RightActions = ({
    // @ts-ignore
    progress,
    dragX,
    onPress,
  }: {
    progress: AnimatedInterpolation;
    dragX: AnimatedInterpolation;
    onPress: VoidFunction;
  }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={[{ transform: [{ scale }], marginRight: -15 }]}>
          <DeleteChat>
            <Feather name="trash" size={24} color={colors.red1} />
          </DeleteChat>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: ChatsType }) => {
      /* just for fix types */
      const itemTime = item.lastMessageTime as unknown as number;
      const convertedTime = new Date(itemTime * 1);

      const splitTitle = item.title.split(' ');
      const title = splitTitle.filter(s => s !== currentUser.userName);

      const splitUri = item.groupImage.split(' ');
      const uri = splitUri.filter(s => s !== currentUser.img);
      const finalImage = uri.length === 0 ? item.groupImage : uri[0];

      return (
        <Swipeable
          renderRightActions={(progress, dragX) => (
            <RightActions
              progress={progress}
              dragX={dragX}
              onPress={() =>
                deleteChat({
                  variables: { chatId: item._id },
                  refetchQueries: [{ query: GET_USER_CHATS, variables: { userId: currentUser?._id } }],
                })
              }
            />
          )}>
          <TouchableOpacity
            onPress={() =>
              navigate(screens.Chat, {
                chatId: item._id,
                conversationUser: title[0],
                conversationUserImage: finalImage,
              })
            }>
            <ChatsFlexBlock withMarginTop>
              <ChatsFlexBlock withoutSpaceBetween>
                <UserImage uri={finalImage} styles={sChats.img} />
                <View>
                  <ChatsTitle>{title[0]}</ChatsTitle>
                  <ChatsLastMessage>
                    {item.lastMessage.length > 25 ? `${item.lastMessage.slice(0, 25)}...` : item.lastMessage}
                  </ChatsLastMessage>
                </View>
              </ChatsFlexBlock>

              <View>
                <ChatsLastMessageTime>{`${convertedTime.getHours()}:${convertedTime.getMinutes()}`}</ChatsLastMessageTime>
              </View>

              {!item.readBy.includes(currentUser?._id) && <UnReadDot />}
            </ChatsFlexBlock>
          </TouchableOpacity>
        </Swipeable>
      );
    },
    [currentUser, deleteChat],
  );

  const keyExtractor = (item: ChatsType) => item._id;

  const data = useMemo(() => (isSearchMode ? searchChats : chats), [isSearchMode, chats, searchChats]);

  if (loading) {
    return <Spinner withMarginTop />;
  }

  return (
    <DefaultContainer>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <ChatsDivider />}
        ListHeaderComponent={
          <>
            <ChatsFlexBlock>
              <ScreenHeader text={screens.Chats} />
              <ChatsPlusButton onPress={() => navigate(screens.AddChat)}>
                <Feather name="plus" size={25} color={colors.white} />
              </ChatsPlusButton>
            </ChatsFlexBlock>
            {chats?.length > 10 && (
              <GraySearchInput
                searchText={searchText}
                setSearchText={setSearchText}
                setIsSearchMode={setIsSearchMode}
                showCancel={showCancel}
              />
            )}
          </>
        }
      />
    </DefaultContainer>
  );
};

export default Chats;
