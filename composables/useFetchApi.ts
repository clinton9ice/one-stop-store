/* eslint-disable no-mixed-spaces-and-tabs */
import { createFetch } from "@vueuse/core";
import { useNotification } from "~/composables";
import type { NotificationTypes } from "~/types";
import { FetchError, FetchOptions, ofetch } from "ofetch";

export const useFetchApi = createFetch({
  baseUrl: "/api/",
  options: {
    onFetchError(ctx) {
      useNotification().alert({
        status: Number(ctx.response?.status),
        message: ctx.data || ctx.error || ctx.response?.text,
      });
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
