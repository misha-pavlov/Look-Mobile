import React, { useCallback, useRef } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { CancelText, InputBox, s, SearchBox } from '../../screens/Search/Search.styles';
import { colors } from '../../config/colors';
import { screens } from '../../config/screens';
import { TGraySearchInput } from './GraySearchInput.types';

const GraySearchInput: React.FC<TGraySearchInput> = ({ searchText, setSearchText, setIsSearchMode, showCancel }) => {
  const inputRef = useRef<TextInput>();

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
  );
};

export default GraySearchInput;
