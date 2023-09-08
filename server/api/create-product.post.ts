import { useSSRFetch } from "@/composables/useSSRFetch";
export default defineEventHandler(async (event) => {
  try {
    const response = await readBody(event);
    const sent = await useSSRFetch(`/products`, event, {
      method: "POST",
      body: response,
    });

    return sent;
  } catch (error) {
    throw createError(error as string);
  }
});
