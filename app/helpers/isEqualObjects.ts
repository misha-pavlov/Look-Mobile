import { User } from '../types/graphql';

export const isEqualObjects = (a: User, b: User) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
