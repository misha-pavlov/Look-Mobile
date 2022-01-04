import React, { Dispatch } from 'react';
import { User } from '../../types/graphql';

export type TGrayInput = {
  comment: string;
  setComment: Dispatch<React.SetStateAction<string>>;
  currentUser: User;
  rightElement?: React.ReactNode;
};
