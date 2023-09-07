<script lang="ts" setup>
import type { ProductContext } from "@/types";
import { useStore } from "@/store/index";
const loading = ref(true);

const { data, isFetching } = await useFetchApi("/getProducts").json();
const { inCart, addToCart, removeFromCart } = useStore();
const allProducts = computed(() => data.value as Array<ProductContext>);
const openProduct = ref(false);
let selectedProduct = reactive<ProductContext>({
  category: "",
  description: "",
  id: 0,
  imageUrl: "",
  name: "",
  unitPrice: 0,
  unitsInStock: 0,
});
const selectProduct = (e: ProductContext) => {
  selectedProduct = e;
  openProduct.value = true;
};

onMounted(async () => {
  await TimeOut(500);
  loading.value = false;
});
watch(isFetching, async (e) => {
  loading.value = e;
});
</script>

<template>
  <div class="grid md:grid-cols-2 justify-center lg:grid-cols-4 pt-20 gap-10">
    <template v-if="loading">
      <div
        v-for="(item, index) in 12"
        :key="index"
        class="min-h-[200px] w-[250px] border rounded-md bg-gray-200 animate-pulse"
      ></div>
    </template>

    <template v-else>
      <div
        v-for="(item, index) in allProducts"
        :key="index"
        class="min-h-[300px] max-w-[250px] w-full group border rounded-lg bg-white border-gray-200 relative light-shadow transition cursor-pointer hover:-translate-y-5"
        @click="selectProduct(item)"
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
      <a-modal v-model:open="openProduct" title="">
        <template #footer>
          <div></div>
        </template>
        <div class="space-y-2">
          <div class="relative w-full max-h-[300px]">
            <img
              :src="selectedProduct?.imageUrl"
              :alt="selectedProduct?.name"
              class="w-full my-4 h-[300px] object-contain object-top"
            />
          </div>

          <div class="">
            <header class="space-y-3">
              <h3 class="text-lg text-blue-950 font-semibold">
                {{ selectedProduct?.name }}
              </h3>
              <div class="flex items-center gap-3">
                <div class="text-muted text-sm font-medium">
                  <span class="text-gray-500">Category: </span>
                  <span class="text-purple-500 capitalize">{{
                    selectedProduct?.category
                  }}</span>
                </div>
                <div class="text-muted text-sm font-medium">
                  <span class="text-gray-500">Units left: </span>
                  <span class="text-orange-500 capitalize">{{
                    selectedProduct?.unitsInStock
                  }}</span>
                </div>
              </div>
              <h2 class="text-xl font-bold text-blue-950">
                ₦{{ selectedProduct?.unitPrice.toLocaleString() }}
              </h2>

              <p class="text-sm text-gray-600">
                {{ selectedProduct?.description }}
              </p>
            </header>

            <div class="flex items-end gap-2">
              <button
                type="button"
                aria-describedby="button"
                :disabled="!inCart(selectedProduct?.id)"
                class="default-btn h-10 w-10 disabled:text-gray-400 disabled:bg-gray-200 text-gray-800 font-bold items-center text-lg inline-flex !rounded-full bg-gray-300 flex-none"
                @click="removeFromCart(selectedProduct?.id)"
              >
                －
              </button>

              <a-button
                class="default-btn w-full bg-purple-500 mt-8 disabled:bg-purple-300"
                :disabled="inCart(selectedProduct?.id)"
                @click="addToCart(selectedProduct)"
              >
                <div class="flex items-center justify-between gap-3">
                  <use-icon
                    dir="other"
                    icon="cart"
                    :height="18"
                    path-class="fill-white"
                  />
                  <span class="text-white">{{
                    inCart(selectedProduct?.id)
                      ? "Added to cart"
                      : "Add to cart"
                  }}</span>
                </div>
              </a-button>
            </div>
          </div>
        </div>
      </a-modal>
      <create-product />
      <create-order />
    </template>
  </div>
</template>
