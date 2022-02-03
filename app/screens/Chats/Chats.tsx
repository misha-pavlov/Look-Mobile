import React, { useCallback, useRef, useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { FlatList, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import { Input } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { DefaultContainer } from '../../common/common.styles';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { screens } from '../../config/screens';
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
import { colors } from '../../config/colors';
import { CancelText, InputBox, s, SearchBox } from '../Search/Search.styles';
import { TChats } from './Chats.types';
import { Chats as ChatsType } from '../../types/graphql';
import UserImage from '../../components/UserImage/UserImage';
import Spinner from '../../components/Spinner/Spinner';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

const Chats: React.FC<TChats> = ({ loading, currentUser, chats }) => {
  const inputRef = useRef<TextInput>();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const showCancel = searchText?.length > 0;

  const onCancelIconPress = useCallback(() => {
    setSearchText('');
    inputRef.current.blur();
  }, [setSearchText]);

  const onCancelPress = useCallback(() => {
    setIsSearchMode(false);
    setSearchText('');
    inputRef.current.blur();
  }, [setIsSearchMode]);

  const onChange = useCallback(
    e => {
      setSearchText(e);
      setIsSearchMode(true);
    },
    [searchText, setSearchText],
  );

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
            <SearchBox>
              <InputBox showCancel={showCancel}>
                <Input
                  ref={inputRef}
                  value={searchText}
                  onChangeText={e => onChange(e)}
                  inputContainerStyle={s.inputContainer}
                  inputStyle={s.input}
                  placeholderTextColor={colors.gray}
                  placeholder={screens.Search}
                  leftIcon={<Feather name="search" size={20} color={colors.gray} />}
                  rightIcon={
                    <TouchableOpacity onPress={onCancelIconPress}>
                      <MaterialIcons name="cancel" size={20} color={showCancel ? colors.black1 : colors.black2} />
                    </TouchableOpacity>
                  }
                />
              </InputBox>

              {showCancel && (
                <TouchableOpacity onPress={onCancelPress}>
                  <CancelText>Cancel</CancelText>
                </TouchableOpacity>
              )}
            </SearchBox>
          </>
        }
      />
    </DefaultContainer>
  );
};

export default Chats;
