<script lang="ts" setup>
import { useStore } from "@/store/index";
const store = useStore();
const cart = computed(() => {
  return store.$state.cart;
});
</script>

<template>
  <header
    class="min-h-[60px] bg-white sticky top-0 light-shadow py-8 border-b w-full border-gray-200 z-10"
  >
    <nav
      class="max-w-[1300px] w-full mx-auto flex items-center justify-between"
    >
      <h3 class="font-extrabold md:text-xl text-lg text-purple-500 italic">
        OneStopStore
      </h3>

      <div class="flex items-center gap-5">
        <button
          type="button"
          aria-describedby="button"
          class="font-medium flex-none relative"
        >
          <use-icon
            dir="other"
            icon="cart"
            :height="30"
            path-class="fill-gray-500"
          />
          <div
            v-if="cart.length > 0"
            class="h-4 text-xs w-4 rounded-full bg-primary-2 text-white absolute -top-1 -right-1 inline-flex items-center justify-center"
          >
            {{ cart.length }}
          </div>
        </button>

        <button
          type="button"
          aria-describedby="button"
          class="default-btn bg-purple-500 flex-none max-w-sm w-full text-white font-medium capitalize hover:bg-purple-600"
          @click="store.toggleProductModal()"
        >
          add Product
        </button>
      </div>
    </nav>
  </header>
</template>
