import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import { EmptyList, PostsBlock, s, UsersBlock } from './SearchTabs.styles';
import { screens } from '../../../../config/screens';
import { messages } from '../../../../config/messages';
import { TSearchTabs } from './SearchTabs.types';
import Spinner from '../../../../components/Spinner/Spinner';
import { createPostsMap, createUsersMap } from './helpers/SearchTabs.helpers';

const SearchTabs: React.FC<TSearchTabs> = ({
  isSearchMode,
  getAllPosts,
  loading,
  users,
  currentUser,
  index,
  setIndex,
  userSearchData,
  postSearchByTitleData,
  postSearchByTagData,
  onCancelPress,
}) => {
  const scrollRef = useRef(null);

  const getPosts = createPostsMap(getAllPosts, currentUser);
  const postSearchByTitle = createPostsMap(postSearchByTitleData, currentUser);
  const postSearchByTag = createPostsMap(postSearchByTagData, currentUser);

  const getUsers = createUsersMap(users, currentUser);
  const getUsersSearch = createUsersMap(userSearchData, currentUser);

  const showData = useCallback(
    (result, mock, indexTab) => {
      if (isSearchMode && index === indexTab) {
        return !result || result?.length === 0 ? <EmptyList>{messages.empty}</EmptyList> : result;
      }

      return mock?.length === 0 ? <EmptyList>{messages.empty}</EmptyList> : mock;
    },
    [isSearchMode, index],
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Tab
        value={index}
        onChange={e => {
          setIndex(e);
          scrollRef.current.scrollTo({});
          onCancelPress();
        }}
        indicatorStyle={s.divider}>
        <Tab.Item title={screens.Posts} titleStyle={s.tab} containerStyle={s.tabView} />
        <Tab.Item title={messages.tags} titleStyle={s.tab} containerStyle={s.tabView} />
        <Tab.Item title={messages.users} titleStyle={s.tab} containerStyle={s.tabView} />
      </Tab>

      <ScrollView ref={scrollRef}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item>
            <PostsBlock>{showData(postSearchByTitle, getPosts, 0)}</PostsBlock>
          </TabView.Item>
          <TabView.Item>
            <PostsBlock>{showData(postSearchByTag, getPosts, 1)}</PostsBlock>
          </TabView.Item>
          <TabView.Item>
            <UsersBlock>{showData(getUsersSearch, getUsers, 2)}</UsersBlock>
          </TabView.Item>
        </TabView>
      </ScrollView>
    </>
  );
};

export default SearchTabs;
