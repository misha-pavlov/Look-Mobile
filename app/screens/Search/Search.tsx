import React, { useCallback, useRef, useState } from 'react';
import { Input } from 'react-native-elements';
import { TouchableOpacity, TextInput } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useLazyQuery } from '@apollo/client';
import { DefaultContainer } from '../../common/common.styles';
import { CancelText, InputBox, SearchBox, s } from './Search.styles';
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';
import { SearchTabsContainer } from './components/SearchTabs/SearchTabsContainer';
import { GET_POSTS_BY_TAG, GET_POSTS_BY_TITLE, SEARCH_USER } from './gql/SearchTabs.queries';

const Search = () => {
  const inputRef = useRef<TextInput>();

  const [postSearchByTitle, { data: postSearchByTitleData, loading: postSearchByTitleLoading }] =
    useLazyQuery(GET_POSTS_BY_TITLE);
  const [postSearchByTag, { data: postSearchByTagData, loading: postSearchByTagLoading }] =
    useLazyQuery(GET_POSTS_BY_TAG);
  const [userSearch, { data: userSearchData, loading: userSearchLoading }] = useLazyQuery(SEARCH_USER);

  const [index, setIndex] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const showCancel = searchText.length > 0;

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
            tag: searchText,
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

  return (
    <DefaultContainer>
      <SearchBox>
        <InputBox showCancel={showCancel}>
          <Input
            ref={inputRef}
            value={searchText}
            onChangeText={e => onChange(e)}
            inputContainerStyle={s.inputContainer}
            inputStyle={s.input}
            placeholderTextColor={colors.white}
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
