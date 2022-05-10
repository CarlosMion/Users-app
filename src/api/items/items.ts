import { useQuery } from 'react-query';
import { IItemsResult, IItemsVariables } from './types';

import { get } from '../http-client';
import { RequestException } from 'api/types';
import { isResponseError } from 'api/utils';

async function getItems({ login }: IItemsVariables) {
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

export function useItems({ login }: IItemsVariables) {
  const { data, error, isLoading } = useQuery<IItemsResult>(
    `login_search=${login}`,
    () => getItems({ login })
  );
  return { items: data?.items ?? [], error, isLoading };
}
