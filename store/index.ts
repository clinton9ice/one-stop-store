import { defineStore } from "pinia";
import type { ProductContext } from "@/types";

export const useStore = defineStore("store", {
  state: () => ({
    notificationMessage: "",
    notificationStatus: 0,
    loaderText: "",
    productModal: false,
    orderModal: false,
    cart: [] as Array<ProductContext>,
    productCategories: ["phone", "laptop", "cars"],
    orderPlaced: false,
  }),
  getters: {
    totalCartItemPrice(state) {
      const t = state.cart.reduce((e, i) => e + i?.unitPrice, 0);
      return t;
    },
    Cart(state) {
      let cart = localStorage.getItem("cart") as unknown;
      if (cart) {
        cart = JSON.parse(cart as string) as ProductContext[];
      }
      state.cart = Array.isArray(cart) ? cart : [];
      return state.cart;
    },
  },
  actions: {
    toggleProductModal() {
      this.productModal = !this.productModal ? true : false;
    },
    toggleOrderModalModal() {
      this.orderModal = !this.orderModal ? true : false;
    },
    inCart(productId: ProductContext["id"]) {
      return (this.$state.cart as Array<ProductContext>).some(
        (item) => item.id === productId
      );
    },
    addToCart(product: ProductContext, increment?: boolean) {
      if (!this.inCart(product.id) || increment) {
        return new Promise((resolve) => {
          const cart = localStorage.getItem("cart");
          if (!cart) {
            localStorage.setItem("cart", JSON.stringify([product]));
            this.$state.cart = [product];
          }
          if (cart) {
            const p = JSON.parse(cart as string);
            p.push(product);
            localStorage.setItem("cart", JSON.stringify(p));
            this.$state.cart = p;
            resolve(p);
          }
          if (!increment) {
            useNotification().alert({
              status: 200,
              message: "item added",
            });
          }
        });
      }
    },
    removeFromCart(productId: ProductContext["id"], subtract?: boolean) {
      let cart = localStorage.getItem("cart");
      if (cart) {
        let store = JSON.parse(cart) as Array<ProductContext>;
        const result = store.filter((item, i) => item.id !== productId);
        if (!subtract) {
          localStorage.setItem("cart", JSON.stringify(result));
          this.$state.cart = result;
          useNotification().alert({
            status: 500,
            message: "item removed",
          });
        } else {
          store.length--;
          localStorage.setItem("cart", JSON.stringify(store));
          this.$state.cart = store;
        }
      }
    },
    clearCart() {
      localStorage.setItem("cart", JSON.stringify([]));
      this.$state.cart = [];
    },
    itemQuantity(id: number) {
      return this.cart.filter((i) => i.id === id).length;
    },
  },
});
