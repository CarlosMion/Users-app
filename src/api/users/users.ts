import { useQuery } from 'react-query';
import { IUsersResult, IUserVariables } from './types';

import { get } from '../http-client';
import { RequestException } from 'api/types';
import { isResponseError } from 'api/utils';

async function getUsers({ login }: IUserVariables) {
  if (!login) {
    throw new Error('login is missing!');
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
  const { data, error, isLoading } = useQuery<IUsersResult>(
    `login_search=${login}`,
    () => getUsers({ login })
  );
  return { users: data?.items ?? [], error, isLoading };
}
