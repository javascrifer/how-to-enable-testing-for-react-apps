import { HttpMethod } from '../../types';

interface BaseWhenRequestOptions {
  url: string;
  headers?: { [key: string]: string };
  queryParams?: URLSearchParams;
}

interface GetWhenRequestOptions extends BaseWhenRequestOptions {
  method: HttpMethod.Get;
}

interface PostWhenRequestOptions extends BaseWhenRequestOptions {
  method:
    | HttpMethod.Post
    | HttpMethod.Put
    | HttpMethod.Patch
    | HttpMethod.Delete;
  data?: unknown;
}

export type WhenRequestOptions = GetWhenRequestOptions | PostWhenRequestOptions;

export interface ResponseMatcher {
  request: {
    queryParams?: URLSearchParams;
    headers?: { [key: string]: string };
    data?: unknown;
  };
  response: { data: unknown };
}

interface ResponseMatcherMap {
  [key: string]: ResponseMatcher[];
}

export type RequestMap = {
  [key in HttpMethod]: ResponseMatcherMap;
};
