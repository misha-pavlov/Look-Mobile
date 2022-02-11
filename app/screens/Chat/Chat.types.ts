import { Messages, User } from '../../types/graphql';
import { TMutation } from '../../types/customTypes';

export type TChat = {
  currentUser: User;
  loading: boolean;
  messages: [Messages];
  typingUsers: string[];
  addMessage: TMutation;
  setReadBy: TMutation;
  deleteMessage: TMutation;
  updateTypingUsers: TMutation;
};
