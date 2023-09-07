<script lang="ts" setup>
import type { ProductContext } from "@/types";
const loading = ref(true);

const { data, isFetching } = await useFetchApi("/getProducts").json();
const allProducts = computed(() => data.value as Array<ProductContext>);

onMounted(async () => {
  await TimeOut(500);
  loading.value = false;
});
watch(isFetching, async (e) => {
  loading.value = e;
});
</script>

<template>
  <div class="grid grid-cols-4 pt-20 gap-10">
    <template v-if="loading">
      <div
        v-for="(item, index) in 12"
        :key="index"
        class="min-h-[200px] max-w-[200px] border rounded-md bg-gray-200 animate-pulse"
      ></div>
    </template>

    <template v-else>
      <div
        v-for="(item, index) in allProducts"
        :key="index"
        class="min-h-[300px] max-w-[250px] group border rounded-lg bg-white border-gray-200 relative light-shadow transition cursor-pointer hover:-translate-y-5"
      >
        <div class="relative">
          <picture
            class="h-flex-center h-width-100p h-height-100p h-overflow-hidden"
            ><source :srcset="item.imageUrl" />
            <img
              :alt="item.name"
              class="w-full h-52 object-cover object-top"
              :src="item.imageUrl"
          /></picture>
          <div class="space-y-1 absolute top-2 left-2">
            <div
              class="rounded-xl h-5 py-3 items-center gap-1 inline-flex w-auto px-4 bg-white border font-medium text-xs"
            >
              <use-icon
                dir="communication"
                :icon="
                  item.category === 'phone'
                    ? 'mobile'
                    : item.category === 'laptop'
                    ? 'macbook'
                    : ''
                "
                :width="20"
                :height="15"
                path-class="fill-purple-500 stroke-purple-500"
              />
              {{ item.category }}
            </div>
            <br />

            <div
              class="rounded-xl h-5 py-3 items-center gap-1 inline-flex px-4 bg-white border font-medium text-xs"
            >
              <span class="text-gray-500">Price: </span>
              <span class="font-bold text-primary-400">
                ₦{{ item?.unitPrice.toLocaleString() || 0 }}</span
              >
            </div>
          </div>
          <div
            class="justify-center absolute bottom-0 right-1 light-shadow h-10 w-10 rounded-full py-3 items-center gap-1 inline-flex px-4 bg-white border font-medium text-xs"
          >
            <use-icon
              dir="other"
              icon="cart"
              :height="17"
              path-class="fill-warning-500"
            />
          </div>
        </div>

        <footer class="p-3 space-y-2">
          <h3
            class="font-semibold text-sm text-blue-950 transition group-hover:text-primary-2"
          >
            {{ item.name }}
          </h3>
          <p class="text-gray-500 text-xs leading-tight">
            {{ item.description }}
          </p>
        </footer>
      </div>
      <create-product />
    </template>
  </div>
</template>
