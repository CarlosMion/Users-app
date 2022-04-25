import { renderHook } from '@testing-library/react';
import { mockUsers } from 'api/fixtures';
import { useUsers } from './users';
import { useQuery } from 'react-query';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

const login = 'testLogin';

describe('users', () => {
  it('gets propper return from useUsers', async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      error: {},
      data: mockUsers,
    });

    const { result } = renderHook(() => useUsers({ login }));

    expect(result.current.users).toEqual(mockUsers);
  });

  it('calls useUsers and get rejected', async () => {
    const testError = { message: 'API error' };

    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      error: {
        others: { message: 'API error' },
        status: 400,
        statusText: 'Bad Request',
      },
      data: undefined,
    });

    const { result } = renderHook(() => useUsers({ login }));

    const error: any = result.current.error;

    expect(result.current.users).toBeUndefined();
    expect(error.others.message).toEqual(testError.message);
    expect(error.status).toBe(400);
    expect(error.statusText).toBe('Bad Request');
  });
});
