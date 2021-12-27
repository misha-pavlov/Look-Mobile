import { Posts } from '../../types/graphql';

export type TCard = {
  post: Posts;
  onPress: VoidFunction;
};
