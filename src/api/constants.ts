export const FAILED_FETCH_RETRIES = 3;
export const BASE_URL = 'https://api.github.com';

export const queryConfigDefaults = {
  refetchOnWindowFocus: false,
  retry: FAILED_FETCH_RETRIES,
};
