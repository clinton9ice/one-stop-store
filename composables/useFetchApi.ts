/* eslint-disable no-mixed-spaces-and-tabs */
import { createFetch } from "@vueuse/core";
import { useNotification } from "~/composables";
import type { NotificationTypes } from "~/types";
import { FetchError, FetchOptions, ofetch } from "ofetch";

export const useFetchApi = createFetch({
  baseUrl: "/api/",
  options: {
    onFetchError(ctx: {
      data: { errors: [] };
      response: Response | null;
      error: unknown;
    }) {
      useNotification().set(ctx as unknown as NotificationTypes);
      return {
        ...ctx,
        error: ctx.data?.errors || ctx.error,
      };
    },
    afterFetch(r) {
      return r;
    },
  },
  fetchOptions: {
    mode: "same-origin",
    keepalive: true,
  },
});
