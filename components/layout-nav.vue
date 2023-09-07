<script lang="ts" setup>
import { useStore } from "@/store/index";
const store = useStore();
const { isMobile } = useMobile();

const cart = computed(() => {
  const unique = store.Cart.filter((item, index) => {
    return index === store.Cart.findIndex((i) => item.id === i.id);
  });
  return unique;
});
const itemSize = (id: number) => store.itemQuantity(id);
const totalPrice = computed(() => {
  return store.totalCartItemPrice;
});
const cartOpen = ref(false);
const toggleCart = () => (cartOpen.value = !cartOpen.value);
const checkout = () => {
  cartOpen.value = false;
  store.toggleOrderModalModal();
};
const mobileDropdownEffect = computed(() => {
  return !isMobile.value ? { open: cartOpen.value } : "";
});
</script>

<template>
  <header
    class="min-h-[60px] px-3 bg-white sticky top-0 light-shadow py-8 border-b w-full border-gray-200 z-10"
  >
    <nav
      class="max-w-[1300px] w-full mx-auto flex items-center justify-between"
    >
      <h3 class="font-extrabold md:text-xl text-md text-purple-500 italic">
        OneStopStore
      </h3>

      <div class="flex items-center gap-5 flex-none">
        <a-dropdown placement="bottom" trigger="click" :open="cartOpen">
          <button
            type="button"
            aria-describedby="button"
            class="font-medium flex-none relative"
            @click="toggleCart"
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
              {{ store.Cart.length }}
            </div>
          </button>

          <template #overlay>
            <div
              class="w-full min-h-[300px] border bg-white p-4 rounded-md light-shadow max-w-lg mt-3"
            >
              <template v-if="cart.length > 0">
                <div class="max-h-[500px] overflow-y-auto">
                  <div
                    v-for="(item, index) in cart"
                    :key="index"
                    class="flex items-center justify-between py-5"
                  >
                    <div class="flex items gap-3 xl:flex-nowrap flex-wrap">
                      <div class="rounded border flex-none">
                        <img
                          :src="item.imageUrl"
                          :alt="item.name"
                          class="w-full h-20"
                        />
                      </div>

                      <div class="space-y-2 w-full">
                        <div
                          class="flex items-start justify-between gap-3 flex-wrap lg:flex-nowrap w-full"
                        >
                          <h4
                            class="text-sm leading-tight max-w-xs font-semibold text-blue-950 pr-5"
                          >
                            {{ item?.name }}
                          </h4>
                          <h4 class="font-medium text-lg">
                            ₦{{ item?.unitPrice.toLocaleString() }}
                          </h4>
                        </div>
                        <p class="text-xs text-gray-400font-medium">
                          <span>Unit: </span>
                          <span class="text-warning-500">{{
                            item?.unitsInStock
                          }}</span>
                        </p>

                        <div class="flex items-center justify-between pt-5">
                          <button
                            type="button"
                            class="!rounded text-warning flex items-center gap-2 text-error-500 hover:text-error-300"
                            @click="store.removeFromCart(item.id)"
                          >
                            <span>Remove</span>
                          </button>

                          <div class="flex items-center gap-2">
                            <button
                              type="button"
                              class="h-6 w-6 rounded text-sm font-bold inline-flex items-center justify-center"
                              :disabled="itemSize(item.id) === 1"
                              :class="[
                                itemSize(item.id) > 1
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-gray-200 text-gray-600 ',
                              ]"
                              @click="store.removeFromCart(item.id, true)"
                            >
                              -
                            </button>
                            <div
                              class="h-6 w-6 rounded light-shadow border-gray-200 border text-gray-600 text-sm inline-flex items-center justify-center"
                            >
                              {{ itemSize(item.id) }}
                            </div>
                            <button
                              type="button"
                              class="h-6 w-6 rounded bg-purple-500 text-white text-sm font-bold inline-flex items-center justify-center"
                              @click="store.addToCart(item, true)"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="py-3">
                  <h4 class="text-gray border-b py-2">Summary</h4>

                  <ul class="list text-sm mt-3">
                    <li class="flex items-center justify-between">
                      <span class="text-gray-500">Subtotal: </span>
                      <span class="font-medium"
                        >₦{{ totalPrice.toLocaleString() }}</span
                      >
                    </li>
                  </ul>
                </div>

                <div class="py-4 flex items-center flex-col justify-center">
                  <button
                    class="default-btn w-full bg-primary-500 text-white font-medium"
                    @click="checkout"
                  >
                    Checkout
                  </button>

                  <button
                    type="button"
                    class="default-btn text-warning-500 font-medium"
                    @click="store.clearCart"
                  >
                    Clear cart
                  </button>
                  <button
                    type="button"
                    class="default-btn text-gray-400 lg:hidden font-medium"
                    @click="toggleCart"
                  >
                    Close
                  </button>
                </div>
              </template>
              <template v-else>
                <div
                  class="min-h-[300px] flex gap-5 items-center flex-col justify-center font-medium text-lg md:min-w-[300px]"
                >
                  <div
                    class="h-12 w-12 border rounded-full inline-flex justify-center items-center"
                  >
                    📂
                  </div>
                  <span class="text-gray-400"> Cart is Empty </span>
                </div>
              </template>
            </div>
          </template>
        </a-dropdown>

        <button
          type="button"
          aria-describedby="button"
          class="default-btn bg-purple-500 flex-none max-w-sm w- text-white font-medium capitalize hover:bg-purple-600"
          @click="store.toggleProductModal()"
        >
          add Product
        </button>
      </div>
    </nav>
  </header>
</template>
