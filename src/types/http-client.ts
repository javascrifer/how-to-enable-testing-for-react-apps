interface BaseRequestOptions {
  headers?: { [key: string]: string };
  queryParams?: URLSearchParams;
}

export type GetRequestOptions = BaseRequestOptions;

type GetRequest = <T>(url: string, options?: GetRequestOptions) => Promise<T>;

export interface PostRequestOptions<T = unknown> extends BaseRequestOptions {
  data?: T;
}

type PostRequest = <TResponse, TData>(
  url: string,
  options?: PostRequestOptions<TData>
) => Promise<TResponse>;

type PutRequest = PostRequest;

type PatchRequest = PostRequest;

type DeleteRequest = PostRequest;

export interface HttpClient {
  get: GetRequest;
  post: PostRequest;
  put: PutRequest;
  patch: PatchRequest;
  delete: DeleteRequest;
}

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}
