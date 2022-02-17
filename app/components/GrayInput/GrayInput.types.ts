import React, { Dispatch } from 'react';
import { User } from '../../types/graphql';

export type TGrayInput = {
  comment: string;
  currentUser: User;
  rightElement?: React.ReactNode;
  isMessagesInput?: boolean;
  replyMessage?: string;
  setComment: Dispatch<React.SetStateAction<string>>;
  setIsReplyMessage: Dispatch<React.SetStateAction<boolean>>;
  setIsFocus?: Dispatch<React.SetStateAction<boolean>>;
};
