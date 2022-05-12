import { HttpMethod } from '../../types';

import { HttpClientTesKit } from './http-client-test-kit';

describe('HttpClientTestKit', () => {
  const headers = { Authorization: 'token' };
  const queryParams = new URLSearchParams({ origin: 'homepage' });
  const data = { email: 'john.doe@example.com' };
  const response = { status: 'ok' };
  let httpClientTesKit: HttpClientTesKit;

  beforeEach(() => {
    httpClientTesKit = new HttpClientTesKit();
  });

  it('throws if there is no matching response for request taking into account http method and url', async () => {
    expect.assertions(1);

    try {
      await httpClientTesKit.get('/');
    } catch (error) {
      expect(error).toEqual(
        new Error('Can not find matching response for "GET" request by url "/"')
      );
    }
  });

  it('throws if request matcher is missing headers', async () => {
    expect.assertions(1);
    httpClientTesKit
      .givenRequest({
        url: '/',
        method: HttpMethod.Get,
        headers,
      })
      .whenResolve(response);

    try {
      await httpClientTesKit.get('/');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Missing query parameters, headers or data in matcher for "GET" request by url "/"'
        )
      );
    }
  });

  it('throws if request matcher is missing query params', async () => {
    expect.assertions(1);
    httpClientTesKit
      .givenRequest({
        url: '/',
        method: HttpMethod.Get,
        queryParams,
      })
      .whenResolve(response);

    try {
      await httpClientTesKit.get('/');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Missing query parameters, headers or data in matcher for "GET" request by url "/"'
        )
      );
    }
  });

  it('throws if request matcher is missing request data', async () => {
    expect.assertions(1);
    httpClientTesKit
      .givenRequest({
        url: '/',
        method: HttpMethod.Post,
        data,
      })
      .whenResolve(response);

    try {
      await httpClientTesKit.post('/');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Missing query parameters, headers or data in matcher for "POST" request by url "/"'
        )
      );
    }
  });

  it('resolves matched GET request with additional query params and headers', async () => {
    httpClientTesKit
      .givenRequest({
        url: '/',
        method: HttpMethod.Get,
        headers,
        queryParams,
      })
      .whenResolve(response);

    const receivedResponse = await httpClientTesKit.get('/', {
      headers,
      queryParams,
    });

    expect(receivedResponse).toStrictEqual(response);
  });

  it('resolves matched POST request with additional query params, headers and data', async () => {
    httpClientTesKit
      .givenRequest({
        url: '/',
        method: HttpMethod.Post,
        headers,
        queryParams,
        data,
      })
      .whenResolve(response);

    const receivedResponse = await httpClientTesKit.post('/', {
      headers,
      queryParams,
      data,
    });

    expect(receivedResponse).toStrictEqual(response);
  });
});
