import React, { useCallback } from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../../../../../types/graphql';
import Spinner from '../../../../../../components/Spinner/Spinner';
import { s, UserBlock, UserImageAndName, UserText } from './UserList.styles';
import { colors } from '../../../../../../config/colors';
import { common } from '../../../../../../common/common.styles';
import { constants } from '../../../../../../config/constants';
import { screens } from '../../../../../../config/screens';
import { NAppNavigatorNavigationProp } from '../../../../../../navigation/types/AppNavigator.types';

const UsersList = ({ data, loading }: { data?: [User]; loading: boolean }) => {
  const navigation = useNavigation<NAppNavigatorNavigationProp<'UserProfile'>>();

  const renderItem = useCallback(c => {
    return (
      <UserBlock onPress={() => navigation.navigate(screens.UserProfile, { user: c.item })}>
        <UserImageAndName>
          <Image
            source={{
              uri: c.item?.img ? c.item?.img : constants.userMock,
            }}
            style={s.img}
            PlaceholderContent={<ActivityIndicator color={colors.white} />}
            placeholderStyle={common.placeholder}
          />
          <UserText>{c.item?.userName}</UserText>
        </UserImageAndName>

        <View>
          <Text>{c.item?.userName}</Text>
        </View>
      </UserBlock>
    );
  }, []);

  const keyExtractor = (item: User) => item._id;

  if (loading) {
    return <Spinner />;
  }

  return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />;
};

export default UsersList;
