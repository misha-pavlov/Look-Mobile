import { Chats, User } from '../../types/graphql';

export type TChats = {
  currentUser: User;
  loading: boolean;
  chats: [Chats];
};
