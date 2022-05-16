import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HttpClientProvider } from './providers/http-client';
import { HttpClientTesKit } from './testing/http-client-test-kit';
import App from './App';
import { HttpMethod, User } from './types';

describe('<App />', () => {
  const email = 'john.doe@example.com';

  const user: User = {
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://via.placeholder.com/15',
  };

  let httpClientTestKit: HttpClientTesKit;

  beforeEach(() => {
    httpClientTestKit = new HttpClientTesKit();

    render(
      <HttpClientProvider httpClient={httpClientTestKit}>
        <App />
      </HttpClientProvider>
    );
  });

  test('renders user avatar from the search form result', async () => {
    httpClientTestKit
      .givenRequest({
        url: 'https://random-data-api.com/api/users/random_user',
        method: HttpMethod.Get,
        queryParams: new URLSearchParams({ email }),
      })
      .whenResolve(user);

    userEvent.type(screen.getByLabelText('Email', { exact: false }), email);
    await act(async () => userEvent.click(screen.getByText('Search')));

    expect(screen.getByRole('img')).toHaveProperty('src', user.avatar);
  });
});
