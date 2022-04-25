import { rest } from 'msw';

import { BASE_URL } from 'api/constants';
import { mockUsers } from './fixtures';

// Get Endpoints
const getUsersEndpoint = `${BASE_URL}/search/users?q={:testLogin} in:login`;

const handlers = [
  rest.get(getUsersEndpoint, async (_req, res, ctx) => {
    return res(ctx.json({ data: mockUsers }));
  }),
];

export { handlers };
