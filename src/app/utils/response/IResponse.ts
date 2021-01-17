export interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IResult<T> = T extends Array<infer U> ? { data: T } & IPagination : { data: T };

export interface IResponse<T> {
  code: number;
  result: IResult<T>;
}
