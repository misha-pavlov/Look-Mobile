import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import { PostsBlock, s } from './SearchTabs.styles';
import { screens } from '../../../../config/screens';
import { messages } from '../../../../config/messages';
import { TSearchTabs } from './SearchTabs.types';
import Card from '../../../../components/Card/Card';
import Spinner from '../../../../components/Spinner/Spinner';

const SearchTabs: React.FC<TSearchTabs> = ({ isSearchMode, getAllPosts, loading }) => {
  const [index, setIndex] = useState(0);

  const getPosts = getAllPosts?.map(g => (
    <Card key={g._id} post={g} onPress={() => console.log('123')} isSearchScreen />
  ));

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView>
      <Tab value={index} onChange={e => setIndex(e)} indicatorStyle={s.divider}>
        <Tab.Item title={screens.Posts} titleStyle={s.tab} containerStyle={s.tabView} />
        <Tab.Item title={messages.tags} titleStyle={s.tab} containerStyle={s.tabView} />
        <Tab.Item title={messages.users} titleStyle={s.tab} containerStyle={s.tabView} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item>
          {/* add empty search text */}
          <PostsBlock>{isSearchMode ? [] : getPosts}</PostsBlock>
        </TabView.Item>
        <TabView.Item>
          <Text>Favorite</Text>
        </TabView.Item>
        <TabView.Item>
          <Text>Favorite</Text>
        </TabView.Item>
      </TabView>
    </ScrollView>
  );
};

export default SearchTabs;
