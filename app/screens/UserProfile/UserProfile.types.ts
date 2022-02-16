import { Chats, User } from '../../types/graphql';

export type TUserProfile = {
  currentUser: User;
  user?: User;
  chats?: [Chats];
};
