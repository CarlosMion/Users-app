import { useQuery } from 'react-query';
import { IUser, IUserVariables } from './types';

import { get, isResponseError } from '../http-client';
import { RequestException } from 'api/types';

async function getUsers({ login }: IUserVariables) {
  if (!login) {
    throw new Error('user login is missing!');
  }

  const endpoint = `/search/users?q=${login} in:login`;

  const result = await get({
    endpoint,
  });

  if (isResponseError(result.status)) {
    throw new RequestException(result as Response);
  }
  return result;
}

export function useUsers({ login }: IUserVariables) {
  const { data, isLoading } = useQuery<IUser>(`login_search=${login}`, () =>
    getUsers({ login })
  );
  return { users: data, isLoading };
}
