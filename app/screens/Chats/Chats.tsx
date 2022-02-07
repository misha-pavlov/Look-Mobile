import React, { useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableOpacity, View, Animated } from 'react-native';
import AnimatedInterpolation = Animated.AnimatedInterpolation;
import Swipeable from 'react-native-gesture-handler/Swipeable';
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

const Chats: React.FC<TChats> = ({ loading, currentUser, chats }) => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const showCancel = searchText?.length > 0;

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
            <Feather name="trash" size={24} color={colors.white} />
          </DeleteChat>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderItem = useCallback(({ item }: { item: ChatsType }) => {
    /* just for fix types */
    const itemTime = item.lastMessageTime as unknown as number;
    const convertedTime = new Date(itemTime * 1);

    const splitTitle = item.title.split(' ');
    const title = splitTitle.filter(s => s !== currentUser.userName);

    const splitUri = item.groupImage.split(' ');
    const uri = splitUri.filter(s => s !== currentUser.img);

    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <RightActions progress={progress} dragX={dragX} onPress={() => console.log('123')} />
        )}>
        <TouchableOpacity>
          <ChatsFlexBlock withMarginTop>
            <ChatsFlexBlock withoutSpaceBetween>
              <UserImage uri={uri.length === 0 ? item.groupImage : uri[0]} styles={sChats.img} />
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
          </ChatsFlexBlock>
        </TouchableOpacity>
      </Swipeable>
    );
  }, []);

  const keyExtractor = (item: ChatsType) => item._id;

  if (loading) {
    return <Spinner withMarginTop />;
  }

  return (
    <DefaultContainer>
      <FlatList
        data={!isSearchMode && chats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <ChatsDivider />}
        ListHeaderComponent={
          <>
            <ChatsFlexBlock>
              <ScreenHeader text={screens.Chats} />
              <ChatsPlusButton>
                <Feather name="plus" size={25} color={colors.white} />
              </ChatsPlusButton>
            </ChatsFlexBlock>
            <GraySearchInput
              searchText={searchText}
              setSearchText={setSearchText}
              setIsSearchMode={setIsSearchMode}
              showCancel={showCancel}
            />
          </>
        }
      />
    </DefaultContainer>
  );
};

export default Chats;
