<template>
  <div>
    <a-drawer
      :width="500"
      :title="activeStep"
      placement="right"
      class="w-full capitalize"
      :open="isProductModalOpen"
      @close="toggleOrderModalModal"
    >
      <section class="w-full py-5">
        <a-form
          v-if="activeStep === 'customer information'"
          ref="form"
          layout="vertical"
          :model="allDetails"
          :rules="rules"
        >
          <a-form-item label="Enter your email" name="customerEmail">
            <a-input
              v-model:value="allDetails.customerEmail"
              placeholder="input your email address"
              html-type="email"
              class="custom-input !px-3"
            />
          </a-form-item>
          <a-form-item label="First name" name="customerFirstName">
            <a-input
              v-model:value="allDetails.customerFirstName"
              placeholder="input your First name"
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="Last name" name="customerLastName">
            <a-input
              v-model:value="allDetails.customerLastName"
              placeholder="input your Last name"
              class="custom-input !px-3"
            />
          </a-form-item>
          <div class="flex items-center justify-between pt-9">
            <button
              type="button"
              class="bg-gray-100 disabled:cursor-not-allowed text-gray-400 text-gray-6 default-btn rounded-md capitalize font-medium"
              disabled
            >
              Back
            </button>
            <button
              class="bg-primary-2 text-white default-btn rounded-md capitalize font-medium"
              @click="createProduct"
            >
              proceed
            </button>
          </div>
        </a-form>

        <a-form
          v-if="activeStep === 'billing information'"
          ref="form"
          layout="vertical"
          :model="allDetails"
          :rules="rules"
        >
          <a-form-item label="City" :name="['billingAddress', 'city']">
            <a-input
              v-model:value="allDetails.billingAddress.city"
              placeholder="input your city"
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="Country" :name="['billingAddress', 'country']">
            <a-select
              v-model:value="allDetails.billingAddress.country"
              placeholder=" select your country"
              show-search
            >
              <a-select-option
                v-for="(item, index) in countries"
                :key="index"
                :value="item.value"
              >
                <div class="flex items-center gap-4">
                  <img
                    :src="item.img"
                    :alt="item.value"
                    class="h-2 text-xs text-gray-25"
                  />
                  <span> {{ item.value }}</span>
                </div>
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="State" :name="['billingAddress', 'state']">
            <a-input
              v-model:value="allDetails.billingAddress.state"
              placeholder="input your state"
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="Street" :name="['billingAddress', 'street']">
            <a-input
              v-model:value="allDetails.billingAddress.street"
              placeholder="input your street"
              class="custom-input !px-3"
            />
          </a-form-item>

          <div class="flex items-center justify-between pt-9">
            <button
              type="button"
              class="bg-gray-200 text-gray-600 text-gray-6 default-btn rounded-md capitalize font-medium"
              @click="decrement"
            >
              Back
            </button>

            <button
              class="bg-primary-2 text-white default-btn rounded-md capitalize font-medium"
              @click="createProduct"
            >
              proceed
            </button>
          </div>
        </a-form>

        <a-form
          v-if="activeStep === 'shipping information'"
          ref="form"
          layout="vertical"
          :model="allDetails"
          :rules="rules"
        >
          <a-form-item label="City" :name="['shippingAddress', 'city']">
            <a-input
              v-model:value="allDetails.shippingAddress.city"
              placeholder="input your city"
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="Country" :name="['shippingAddress', 'country']">
            <a-select
              v-model:value="allDetails.shippingAddress.country"
              placeholder=" select your country"
              show-search
            >
              <a-select-option
                v-for="(item, index) in countries"
                :key="index"
                :value="item.value"
              >
                <div class="flex items-center gap-4">
                  <img
                    :src="item.img"
                    :alt="item.value"
                    class="h-2 text-xs text-gray-25"
                  />
                  <span> {{ item.value }}</span>
                </div>
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="State" :name="['shippingAddress', 'state']">
            <a-input
              v-model:value="allDetails.shippingAddress.state"
              placeholder="input your state"
              class="custom-input !px-3"
            />
          </a-form-item>

          <a-form-item label="Street" :name="['shippingAddress', 'street']">
            <a-input
              v-model:value="allDetails.shippingAddress.street"
              placeholder="input your street"
              class="custom-input !px-3"
            />
          </a-form-item>

          <div class="flex items-center justify-between pt-9">
            <button
              type="button"
              class="bg-gray-200 text-gray-600 text-gray-6 default-btn rounded-md capitalize font-medium"
              @click="decrement"
            >
              Back
            </button>

            <a-button
              :loading="submitting"
              :disabled="submitting"
              class="bg-purple-500 disabled:bg-purple-300 text-white default-btn rounded-md capitalize font-medium"
              @click="createProduct"
            >
              Submit
            </a-button>
          </div>
        </a-form>
      </section>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/index";
import type { OrderContext } from "~/types";
import type { Rule } from "ant-design-vue/es/form";
const {
  toggleOrderModalModal,
  Cart,
  itemQuantity,
  totalCartItemPrice,
  clearCart,
} = useStore();
const isProductModalOpen = computed(() => {
  return useStore().$state.orderModal;
});
const submitting = ref(false);
const steps = [
  "customer information",
  "billing information",
  "shipping information",
] as const;
const stepCount = ref(0);
const totalSteps = 3;
const activeStep = computed(() => {
  return steps[stepCount.value] as (typeof steps)[number];
});

const rules: Record<string, Rule[]> = {
  customerEmail: [
    {
      required: true,
      message: "Please input your email",
      trigger: "change",
    },
    { type: "email", trigger: "blur" },
  ],
  customerFirstName: [
    {
      required: true,
      message: "Please input  Your first name",
      trigger: "change",
    },
    { trigger: "blur" },
  ],
  customerLastName: [
    {
      required: true,
      message: "Please input your last name",
      trigger: "blur",
    },
  ],
  "billingAddress.city": [
    {
      required: true,
      message: "Please specify your city",
      trigger: "blur",
    },
  ],
  "billingAddress.country": [
    {
      required: true,
      message: "Please specify your country",
      trigger: "blur",
    },
  ],
  "billingAddress.state": [
    {
      required: true,
      message: "Please specify your state",
      trigger: "blur",
    },
  ],
  "billingAddress.street": [
    {
      required: true,
      message: "Please include your street",
      trigger: "blur",
    },
  ],
  "shippingAddress.city": [
    {
      required: true,
      message: "Please specify your city",
      trigger: "blur",
    },
  ],
  "shippingAddress.country": [
    {
      required: true,
      message: "Please specify your country",
      trigger: "blur",
    },
  ],
  "shippingAddress.state": [
    {
      required: true,
      message: "Please specify your state",
      trigger: "blur",
    },
  ],
  "shippingAddress.street": [
    {
      required: true,
      message: "Please include your street",
      trigger: "blur",
    },
  ],
};
const form = ref();
const countries = ref<{ value: string; img: string }[]>([]);
const getCountries = async () => {
  try {
    const { data } = await useFetch("https://restcountries.com/v3.1/all");
    if (Array.isArray(data.value)) {
      countries.value = data.value.map((i) => ({
        value: i.name.common,
        img: i.flags.png,
      }));
    }
  } catch (error) {
    console.error(error);
  }
};

const allDetails = reactive<OrderContext>({
  customerEmail: "",
  customerFirstName: "",
  customerLastName: "",
  billingAddress: {
    city: "",
    country: "",
    state: "",
    street: "",
  },
  orderItems: [],
  shippingAddress: {
    city: "",
    country: "",
    state: "",
    street: "",
  },
  totalPrice: 0,
  totalQuantity: 0,
});
const decrement = () => {
  if (stepCount.value > 0) {
    stepCount.value--;
  }
};
const createProduct = () => {
  form.value
    .validate()
    .then(async () => {
      if (stepCount.value === totalSteps - 1) {
        submitting.value = true;
        allDetails.orderItems = Cart.map((item) => ({
          productId: item.id,
          quantity: itemQuantity(item.id),
          unitPrice: item.unitPrice,
        }));
        allDetails.totalQuantity = Cart.length;
        allDetails.totalPrice = totalCartItemPrice;
        try {
          const { data } = await useFetch("/api/create-order", {
            method: "POST",
            body: allDetails,
          });
          if (data.value) {
            clearCart();
            useStore().$state.orderPlaced = true;
            toggleOrderModalModal();
          }
        } catch (error) {
        } finally {
          submitting.value = false;
        }
      }
      if (stepCount.value < totalSteps - 1) {
        stepCount.value++;
      }
    })
    .catch((error: Error) => {
      console.error("error", error);
    });
};
onMounted(getCountries);
</script>
