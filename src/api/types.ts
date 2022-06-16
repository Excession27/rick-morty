import { AxiosResponse } from "axios";

export type CharacterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: [];
  url: string;
  created: string;
};

export type APIResponse = {
  data: { pages: PageDataType[]; pageParams: any };
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
  error: boolean | null;
  errorUpdatedAt: number;
  failureCount: number;
  errorUpdateCount: number;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isLoadingError: boolean;
  isPlaceholderData: boolean;
  isPreviousData: boolean;
  isRefetchError: boolean;
  isStale: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
  dataUpdatedAt: number;
};

export type PageDataType = {
  data: { info: PageInfoType; results: CharacterType[] };
  status: number;
  statusText: string;
  headers: any;
};

export type PageInfoType = {
  count: number;
  pages: 42;
  next: string | null;
  prev: string | null;
};

export type APICall<CharacterType> = Promise<
  AxiosResponse<Array<CharacterType>>
>;

export enum CharacterStatus {
  any = "",
  alive = "alive",
  dead = "dead",
  unknown = "unknown",
}
