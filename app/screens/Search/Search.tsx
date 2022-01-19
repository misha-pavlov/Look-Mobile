import React, { useCallback, useRef, useState } from 'react';
import { Input } from 'react-native-elements';
import { TouchableOpacity, TextInput } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { DefaultContainer } from '../../common/common.styles';
import { CancelText, InputBox, SearchBox, s } from './Search.styles';
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';
import { SearchTabsContainer } from './components/SearchTabs/SearchTabsContainer';

const Search = () => {
  const inputRef = useRef<TextInput>();
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

      <SearchTabsContainer isSearchMode={isSearchMode} loading={false} />
    </DefaultContainer>
  );
};

export default Search;
