import { defineStore } from "pinia";
import type { ProductContext } from "@/types";
export const useStore = defineStore("store", {
  state: () => ({
    notificationMessage: "",
    notificationStatus: 0,
    loaderText: "",
    productModal: false,
    cart: [] as Array<ProductContext>,
    productCategories: ["phone", "laptop", "cars"],
  }),
  getters: {},
  actions: {
    toggleProductModal() {
      this.productModal = !this.productModal ? true : false;
    },
  },
});
