import {
  GetRequestOptions,
  HttpClient,
  HttpMethod,
  PostRequestOptions,
} from '../types';

export class FetchHttpClient implements HttpClient {
  get<T>(url: string, options?: GetRequestOptions) {
    return this.performRequest<T>(HttpMethod.Get, url, options);
  }

  post<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Post, url, options);
  }

  put<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Put, url, options);
  }

  patch<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Patch, url, options);
  }

  delete<TResponse, TData>(url: string, options?: PostRequestOptions<TData>) {
    return this.performRequest<TResponse>(HttpMethod.Delete, url, options);
  }

  private async performRequest<TResponse, TData = unknown>(
    method: HttpMethod,
    url: string,
    options?: GetRequestOptions | PostRequestOptions<TData>
  ): Promise<TResponse> {
    const urlWithQueryParams = options?.queryParams
      ? `${url}?${options.queryParams.toString()}`
      : url;

    const headers = options?.headers
      ? new Headers(options?.headers)
      : undefined;

    const body =
      options && 'data' in options ? JSON.stringify(options.data) : undefined;

    const response = await fetch(urlWithQueryParams, {
      method,
      body,
      headers,
    });

    return response.json();
  }
}
