import { Dispatch, SetStateAction } from 'react';

export type TGraySearchInput = {
  showCancel: boolean;
  searchText: string;

  setSearchText: Dispatch<SetStateAction<string>>;
  setIsSearchMode: Dispatch<SetStateAction<boolean>>;
};
