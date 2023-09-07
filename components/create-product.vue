<template>
  <div>
    <a-drawer
      :width="500"
      title="Create a product"
      placement="right"
      class="w-full"
      :open="isProductModalOpen"
      @close="toggleProductModal"
    >
      <section class="w-full py-5">
        <a-form
          ref="form"
          layout="vertical"
          :model="formDetails"
          :rules="rules"
        >
          <a-form-item label="Product name" name="name">
            <a-input
              v-model:value="formDetails.name"
              placeholder="input your product name"
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="Product Category" name="category">
            <a-select
              v-model:value="formDetails.category"
              placeholder="please select a product category"
            >
              <a-select-option
                v-for="(item, index) in productCategory"
                :key="index"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Product Description" name="description">
            <a-textarea
              v-model:value="formDetails.description"
              placeholder="Describe your product"
              class="input border-gray-200 p-3"
            />
          </a-form-item>

          <a-form-item label="Product sku" name="sku">
            <a-input
              v-model:value="formDetails.sku"
              placeholder="input your product sku"
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="What is your unit price" name="unitPrice">
            <a-input
              v-model:value="formDetails.unitPrice"
              v-naira
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="What is your unit in stock" name="unitsInStock">
            <a-input
              v-model:value="formDetails.unitsInStock"
              type="number"
              min="1"
              class="custom-input !px-3"
            />
          </a-form-item>

          <div class="inline-flex items-center gap-2 my-5">
            <span class="text-xs text-gray-500 font-medium"
              >Upload product image link</span
            >
            <a-switch v-model:checked="imageLink" class="bg-gray-300" />
          </div>

          <a-form-item
            v-if="!imageLink"
            label="Upload your product image"
            :rules="[
              {
                required: productImage === '',
              },
            ]"
          >
            <upload v-model:photo-src="productImage" required />
          </a-form-item>
          <a-form-item v-else label="Product Image Url" name="imageUrl">
            <a-input
              v-model:value="formDetails.imageUrl"
              placeholder="paste your product image link"
              class="custom-input !px-3"
            />
          </a-form-item>

          <div class="flex w-full pt-5">
            <a-button
              :loading="submitting"
              class="bg-purple-500 text-white default-btn w-full hover:bg-purple-600"
              @click="createProduct"
            >
              <span class="text-white">Create product</span>
            </a-button>
          </div>
        </a-form>
      </section>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/index";
import type { PhotoContext } from "@/composables/useMedia";
import type { Rule } from "ant-design-vue/es/form";
const { toggleProductModal } = useStore();
const isProductModalOpen = computed(() => {
  return useStore().$state.productModal;
});
const submitting = ref(false);

const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: "Please input Product name",
      trigger: "change",
    },
    { min: 3, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  sku: [
    {
      required: true,
      message: "Please input Product sku",
      trigger: "change",
    },
    { min: 3, message: "Length should be min of 3", trigger: "blur" },
  ],
  category: [
    {
      required: true,
      message: "Please select product category",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "Please input product description",
      trigger: "blur",
    },
  ],
  unitPrice: [
    {
      required: true,
      message: "Please input product unit price",
      trigger: "blur",
    },
  ],
  unitsInStock: [
    {
      required: true,
      message: "Please input product units in stock",
      trigger: "blur",
    },
  ],
  imageUrl: [
    {
      required: true,
      message: "Please input product image",
      trigger: "change",
    },
    {
      type: "url",
    },
  ],
};
const productImage = ref<PhotoContext | string>("");
const form = ref();
const imageLink = ref(false);
const formDetails = reactive({
  category: "",
  sku: "",
  name: "",
  description: "",
  unitPrice: 0,
  imageUrl: "",
  unitsInStock: 0,
});
const productCategory = computed(() => {
  return useStore().$state.productCategories;
});

const createProduct = () => {
  form.value
    .validate()
    .then(async () => {
      submitting.value = true;
      formDetails.unitPrice = useCurrency().nairaToNumber(
        String(formDetails.unitPrice)
      );

      if (
        !isValidUrl(formDetails.imageUrl) &&
        typeof productImage.value !== "string"
      ) {
        formDetails.imageUrl = (productImage.value as PhotoContext)
          ?.src as string;
      }

      try {
        const { data } = await useFetch("/api/create-product", {
          method: "POST",
          body: formDetails,
        });
        if (data.value) {
          refreshNuxtData();
        }
      } catch (error) {
      } finally {
        submitting.value = false;
      }
    })
    .catch((error: Error) => {
      console.error("error", error);
    });
};
</script>

<style></style>
