import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import { PostsBlock, s, UsersBlock } from './SearchTabs.styles';
import { screens } from '../../../../config/screens';
import { messages } from '../../../../config/messages';
import { TSearchTabs } from './SearchTabs.types';
import Card from '../../../../components/Card/Card';
import Spinner from '../../../../components/Spinner/Spinner';
import UsersItem from './components/UserItem/UserItem';

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

  /* TODO: create helpers and move map in function */
  const getPosts = getAllPosts?.map(g => (
    <Card key={g._id} post={g} onPress={() => console.log('123')} isSearchScreen />
  ));
  const postSearchByTitle = postSearchByTitleData?.map(g => (
    <Card key={g._id} post={g} onPress={() => console.log('123')} isSearchScreen />
  ));
  const postSearchByTag = postSearchByTagData?.map(g => (
    <Card key={g._id} post={g} onPress={() => console.log('123')} isSearchScreen />
  ));

  const getUsers = users?.map(u => <UsersItem key={u._id} user={u} currentUser={currentUser} />);
  const getUsersSearch = userSearchData?.map(u => <UsersItem key={u._id} user={u} currentUser={currentUser} />);

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
            {/* add empty search text */}
            <PostsBlock>{isSearchMode && index == 0 ? postSearchByTitle : getPosts}</PostsBlock>
          </TabView.Item>
          <TabView.Item>
            {/* add empty search text */}
            <PostsBlock>{isSearchMode && index == 1 ? postSearchByTag : getPosts}</PostsBlock>
          </TabView.Item>
          <TabView.Item>
            {/* add empty search text */}
            <UsersBlock>{isSearchMode && index == 2 ? getUsersSearch : getUsers}</UsersBlock>
          </TabView.Item>
        </TabView>
      </ScrollView>
    </>
  );
};

export default SearchTabs;
