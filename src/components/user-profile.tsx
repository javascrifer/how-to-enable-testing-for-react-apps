import React, { FC } from 'react';

import { User } from '../types';

interface UserProfileProps {
  user: User;
}

export const UserProfile: FC<UserProfileProps> = ({ user }) => (
  <section>
    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
    <p>
      {user.first_name} {user.last_name}
    </p>
  </section>
);
