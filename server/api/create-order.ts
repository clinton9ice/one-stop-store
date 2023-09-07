import { useSSRFetch } from "@/composables/useSSRFetch";
export default defineEventHandler(async (event) => {
  try {
    const response = await readBody(event);
    const sent = await useSSRFetch(`/orders`, event, {
      method: "POST",
      body: response,
    });

    return { status: 200, ...sent };
  } catch (error) {
    return error;
  }
});
