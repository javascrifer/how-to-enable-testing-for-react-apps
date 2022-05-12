import React, { createContext, FC, PropsWithChildren } from 'react';

import { HttpClient } from '../types';

type HttpClientProviderProps = PropsWithChildren<{
  httpClient: HttpClient;
}>;

export const HttpClientContext = createContext<HttpClient | null>(null);

export const HttpClientProvider: FC<HttpClientProviderProps> = ({
  httpClient,
  children,
}) => (
  <HttpClientContext.Provider value={httpClient}>
    {children}
  </HttpClientContext.Provider>
);
