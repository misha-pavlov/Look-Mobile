import { Dispatch, SetStateAction } from 'react';
import { Posts, User } from '../../../../types/graphql';

export type TSearchTabs = {
  index: number;
  isSearchMode: boolean;
  loading: boolean;
  getAllPosts?: [Posts];
  users?: [User];
  userSearchData?: [User];
  postSearchByTitleData?: [Posts];
  postSearchByTagData?: [Posts];
  currentUser?: User;
  setIndex: Dispatch<SetStateAction<number>>;
  onCancelPress: VoidFunction;
};
