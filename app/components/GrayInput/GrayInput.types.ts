import React, { Dispatch } from 'react';
import { User } from '../../types/graphql';

export type TGrayInput = {
  comment: string;
  setComment: Dispatch<React.SetStateAction<string>>;
  setIsFocus?: Dispatch<React.SetStateAction<boolean>>;
  currentUser: User;
  rightElement?: React.ReactNode;
  isMessagesInput?: boolean;
};
