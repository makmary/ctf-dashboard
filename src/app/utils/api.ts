import defaultsDeep from 'lodash/defaultsDeep';
import { IResponse } from './response/IResponse';

export interface IFetchResponse<T> extends Response {
  json(): Promise<IResponse<T>>;
}

export enum Routes {
  LOGIN = '/api/auth/login',
  REGISTER = '/api/user/registration',
  GET_ALL_NEWS = '/api/news/all',
  GET_ONE_NEWS = '/api/news/:id',
}

export const fetchMain = <T>(route: string, options: RequestInit = {}): Promise<IFetchResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return fetch(
    `${route}`,
    defaultsDeep(options, {
      headers,
    }),
  );
};
