import { isResponseError } from '.';

describe('api utils', () => {
  it('calls isResponseError', () => {
    const ok = isResponseError(200);
    const noContent = isResponseError(204);
    const badRequest = isResponseError(400);
    const notFound = isResponseError(404);
    const internalServerError = isResponseError(500);

    expect(ok).toBeFalsy();
    expect(noContent).toBeFalsy();
    expect(badRequest).toBeTruthy();
    expect(notFound).toBeTruthy();
    expect(internalServerError).toBeTruthy();
  });
});
