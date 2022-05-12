import _ from 'lodash';

import {
  HttpClient,
  GetRequestOptions,
  PostRequestOptions,
  HttpMethod,
} from '../../types';

import { RequestMap, ResponseMatcher, WhenRequestOptions } from './types';

export class HttpClientTesKit implements HttpClient {
  private requestMap: RequestMap = {
    [HttpMethod.Get]: {},
    [HttpMethod.Post]: {},
    [HttpMethod.Put]: {},
    [HttpMethod.Patch]: {},
    [HttpMethod.Delete]: {},
  };

  givenRequest(options: WhenRequestOptions) {
    const responseMatcher = this.requestMap[options.method];

    if (!responseMatcher[options.url]) {
      responseMatcher[options.url] = [];
    }

    return {
      whenResolve: (data: unknown) => {
        responseMatcher[options.url].push({
          request: {
            headers: options.headers,
            queryParams: options.queryParams,
            data: options.method === HttpMethod.Get ? undefined : options.data,
          },
          response: { data },
        });
        return this;
      },
    };
  }

  get<T>(url: string, options?: GetRequestOptions) {
    return this.performRequest<T>(HttpMethod.Get, url, options);
  }

  post<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Post, url, options);
  }

  put<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Post, url, options);
  }

  patch<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Post, url, options);
  }

  delete<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Post, url, options);
  }

  private performRequest<T>(
    method: HttpMethod,
    url: string,
    options?: PostRequestOptions
  ) {
    const responseMatchers = this.getResponseMatchers(method, url);
    if (!responseMatchers) {
      throw new Error(
        `Can not find matching response for "${method}" request by url "${url}"`
      );
    }

    const matchedResponse = this.getMatchedResponse(responseMatchers, options);
    if (!matchedResponse) {
      throw new Error(
        `Missing query parameters, headers or data in matcher for "${method}" request by url "${url}"`
      );
    }

    return Promise.resolve(matchedResponse.response.data as T);
  }

  private getResponseMatchers(method: HttpMethod, url: string) {
    const responseMatchers = this.requestMap[method][url];
    return responseMatchers;
  }

  private getMatchedResponse(
    responseMatchers: ResponseMatcher[],
    requestOptions?: GetRequestOptions | PostRequestOptions
  ) {
    const matchedResponse = responseMatchers.find(({ request }) => {
      const matchesQueryParams =
        request.queryParams?.toString() ===
        requestOptions?.queryParams?.toString();

      const matchesHeaders = _.isEqual(
        request.headers,
        requestOptions?.headers
      );

      const matchesData =
        requestOptions && 'data' in requestOptions
          ? _.isEqual(request.data, requestOptions.data)
          : !request.data;

      return matchesQueryParams && matchesHeaders && matchesData;
    });

    return matchedResponse;
  }
}
