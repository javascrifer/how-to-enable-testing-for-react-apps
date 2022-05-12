import React, {
  FC,
  FormEventHandler,
  ChangeEventHandler,
  useState,
} from 'react';

interface SearchFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export const SearchForm: FC<SearchFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    onSubmit(email);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        required
        onChange={handleEmailChange}
      />
      <button type="submit" disabled={email.length === 0 || isLoading}>
        Subscribe
      </button>
    </form>
  );
};
