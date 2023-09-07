import { ofetch } from "ofetch";
import type { FetchError, FetchOptions } from "ofetch";
import { H3Event } from "h3";

export const useSSRFetch = (
  url: string,
  event?: H3Event,
  options?: FetchOptions
): Promise<FetchError> => {
  return ofetch(url, {
    baseURL: String(
      import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_URL
    ),
    headers: {
      "X-API-KEY": import.meta.env.VITE_ACCOUNT_API_KEY,
    },
    ...options,
  });
};
