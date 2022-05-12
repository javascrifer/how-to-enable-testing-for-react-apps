import React, { FC, useState } from 'react';

import { User } from './types';
import { useHttpClient } from './hooks/use-http-client';
import { SearchForm } from './components/search-form';
import { UserProfile } from './components/user-profile';

const App: FC = () => {
  const [user, setUser] = useState<User>();
  const httpClient = useHttpClient();

  const handleSubmit = async (email: string) => {
    const response = await httpClient.get<User>(
      'https://random-data-api.com/api/users/random_user',
      { queryParams: new URLSearchParams({ email }) }
    );
    setUser(response);
  };

  return (
    <main>
      <h1>Find user by email</h1>
      <SearchForm onSubmit={handleSubmit} />
      {user && <UserProfile user={user} />}
    </main>
  );
};

export default App;
