import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from 'react-native-elements';
import { TouchableOpacity, TextInput, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useLazyQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { DefaultContainer } from '../../common/common.styles';
import { CancelText, InputBox, SearchBox, s } from './Search.styles';
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';
import { SearchTabsContainer } from './components/SearchTabs/SearchTabsContainer';
import { GET_POSTS_BY_TAG, GET_POSTS_BY_TITLE } from './gql/SearchTabs.queries';
import { NAppNavigatorRouteProp } from '../../navigation/types/AppNavigator.types';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { SEARCH_USER } from '../../gql/user/user.queries';

const Search = () => {
  const inputRef = useRef<TextInput>();
  const { params } = useRoute<NAppNavigatorRouteProp<'Search'>>();

  const [postSearchByTitle, { data: postSearchByTitleData, loading: postSearchByTitleLoading }] =
    useLazyQuery(GET_POSTS_BY_TITLE);
  const [postSearchByTag, { data: postSearchByTagData, loading: postSearchByTagLoading }] = useLazyQuery(
    GET_POSTS_BY_TAG,
    { pollInterval: 3000 },
  );
  const [userSearch, { data: userSearchData, loading: userSearchLoading }] = useLazyQuery(SEARCH_USER);

  const [index, setIndex] = useState(0);
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

      if (e === '') {
        setIsSearchMode(false);
      }

      if (index === 0) {
        postSearchByTitle({
          variables: {
            title: searchText,
          },
        });
      }

      if (index === 1) {
        postSearchByTag({
          variables: {
            tag: e,
          },
        });
      }

      if (index === 2) {
        userSearch({
          variables: {
            userName: searchText,
          },
        });
      }
    },
    [searchText, setSearchText],
  );

  useEffect(() => {
    setIndex(params?.startTab ? params.startTab : 0);
    setSearchText(params?.tag ? params.tag : '');
    onChange(params?.tag.trim());
  }, [params?.startTab, params?.tag, setIndex, setSearchText]);

  return (
    <DefaultContainer>
      <View>
        <ScreenHeader text={screens.Search} />
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
      </View>

      <SearchTabsContainer
        isSearchMode={isSearchMode}
        loading={userSearchLoading || postSearchByTitleLoading || postSearchByTagLoading}
        index={index}
        setIndex={setIndex}
        userSearchData={userSearchData?.searchUser}
        postSearchByTitleData={postSearchByTitleData?.getPostsByTitle}
        postSearchByTagData={postSearchByTagData?.getPostsByTag}
        onCancelPress={onCancelPress}
      />
    </DefaultContainer>
  );
};

export default Search;
