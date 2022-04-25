export function isResponseError(statusCode: number) {
  return statusCode >= 400;
}
