import { FetchResult, MutationFunctionOptions } from '@apollo/client';

export type TTags = Array<{ _id: string; title: string }>;

export enum SearchTabsEnum {
  Posts,
  Tags,
  Users,
}

export type TMutation = (options?: MutationFunctionOptions) => Promise<FetchResult<any>>;
