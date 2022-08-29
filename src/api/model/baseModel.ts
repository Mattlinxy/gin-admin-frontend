export interface BasicPageParams {
  page: number;
  size: number;
}

export interface BasicFetchResult<T> {
  list: T[];
  total: number;
}
