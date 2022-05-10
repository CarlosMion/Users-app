import { renderHook } from '@testing-library/react';
import { mockItems } from 'api/fixtures';
import { useItems } from './items';
import { useQuery } from 'react-query';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

const login = 'testLogin';

describe('items', () => {
  it('gets propper return from useUsers', async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      error: {},
      data: mockItems,
    });

    const { result } = renderHook(() => useItems({ login }));

    expect(result.current.items).toEqual(mockItems.items);
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

    const { result } = renderHook(() => useItems({ login }));

    const error: any = result.current.error;

    expect(result.current.items).toStrictEqual([]);
    expect(error.others.message).toEqual(testError.message);
    expect(error.status).toBe(400);
    expect(error.statusText).toBe('Bad Request');
  });
});
