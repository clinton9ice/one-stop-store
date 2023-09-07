import { useSSRFetch } from "@/composables/useSSRFetch";
import { useRequestEvent, useRequestURL } from "nuxt/app";
export default defineEventHandler((event) => {
  const body = getQuery(event);
  try {
    const data = useSSRFetch(
      `/products?offset=${body?.offset || 0}&size=${body?.size || 10}`,
      event
    );
    return data;
  } catch (error) {
    return error;
  }
});
