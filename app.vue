<script lang="ts" setup>
import { message } from "ant-design-vue";
import { useStore } from "@/store";
message.config({
  duration: 3,
  maxCount: 3,
});

const orderPlaced = computed(() => {
  return useStore().$state.orderPlaced;
});
const proceed = () => {
  useStore().$state.orderPlaced = false;
  refreshNuxtData();
};
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <a-modal :open="orderPlaced" title="">
      <template #footer>
        <div></div>
      </template>
      <div
        class="max-w-[403px] mx-auto flex items-center flex-col justify-center space-y-10 py-5"
      >
        <div
          class="text-center header mx-auto flex items-center flex-col justify-center gap-5 text-xl font-bold leading-3"
        >
          <use-icon dir="other" icon="success" :height="59.11" :width="59.11" />
        </div>

        <div class="text-gray-500 font-medium text-lg leading-snug text-center">
          Your Order has been successfully placed. One of our customer agent
          will be reaching out to you shortly to confirm your order before the
          shipping. <br />
          Thanks for shopping with us
        </div>

        <div class="py-8 flex items-center justify-between w-full">
          <button
            type="button"
            aria-describedby="button"
            class="default-btn bg-primary-2 text-white w-full capitalize hover:bg-primary-400 font-semibold"
            @click="proceed"
          >
            Alright
          </button>
        </div>
      </div>
    </a-modal>
  </NuxtLayout>
</template>
