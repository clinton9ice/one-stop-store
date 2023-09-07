<script lang="ts" setup>
import type { PhotoContext } from "@/composables/useMedia";
defineProps<{
  photoSrc: PhotoContext["file"] | PhotoContext;
}>();
const input = ref<HTMLInputElement | null>(null);
const emit = defineEmits<{
  (param: "update:photoSrc", arg: PhotoContext | string): void;
  (param: "cancel", arg: Function): void;
}>();
const openGallery = () => {
  if (input.value) {
    input.value.click();
  }
};
const {
  value: { getPhoto },
} = useMedia();
const getFile = (e: PhotoContext) => {
  emit("update:photoSrc", e);
};
const clearPhoto = () => {
  emit("update:photoSrc", "");
};
</script>

<template>
  <div class="tab-body md:mt-10 relative md:block">
    <div class="placement-container w-full relative transition-all ease-linear">
      <transition
        name="animate__animated"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
      >
        <div
          class="max-w-[429px] w-full flex-wrap md:h-[145px] px-4 py-3 rounded-lg border-[2px] border-dotted border-slate-400 flex-col justify-center items-center gap-2.5 flex"
        >
          <div
            class="max-w-[375px] w-full justify-center items-center gap-10 flex cursor-pointer"
            @click="openGallery"
          >
            <div
              v-if="(photoSrc as PhotoContext).name"
              class="w-[82.42px] h-[78.30px] relative flex-col justify-start items-start inline-flex overflow-hidden"
            >
              <img
                :src="((photoSrc as PhotoContext).src as string)"
                class="w-full object-contain h-full"
              />
            </div>

            <div
              class="flex-col justify-start items-center gap-[7px] inline-flex"
            >
              <div
                class="max-w-[82px] w-full text-center text-slate-400 text-sm font-semibold leading-none"
              >
                {{ !photoSrc.src ? "Browse file" : "Re-upload" }}
              </div>
              <div
                class="min-w-[168px] text-center text-slate-400 text-[13px] font-normal leading-snug"
              >
                {{
                  !photoSrc.src
                    ? `File format: jpeg,
              png, webp  (Max File 1mb)`
                    : photoSrc.name
                }}
              </div>
            </div>
          </div>
          <input
            ref="input"
            type="file"
            accept=".jpg,.png,.webp"
            hidden
            class="!hidden"
            @change="(e) => getPhoto(e, getFile)"
          />
        </div>
      </transition>

      <div class="mt-8">
        <slot :cancel="clearPhoto" />
      </div>
    </div>
  </div>
</template>
