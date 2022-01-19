import { Posts } from '../../types/graphql';

export type TCard = {
  post: Posts;
  isSearchScreen?: boolean;
  onPress: VoidFunction;
};
