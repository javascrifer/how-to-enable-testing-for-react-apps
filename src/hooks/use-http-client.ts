import { useContext } from 'react';

import { HttpClientContext } from '../providers/http-client';

export const useHttpClient = () => {
  const context = useContext(HttpClientContext);

  if (!context) {
    throw new Error('Wrap your component with HttpClientProvider');
  }

  return context;
};
