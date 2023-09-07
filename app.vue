<script lang="ts" setup>
import { message } from "ant-design-vue";
import { UnwrapRef } from "vue";
import type { NotificationState } from "~/types";
const notification = useState<UnwrapRef<NotificationState>>("Notification");
message.config({
  duration: 3,
  maxCount: 3,
});
watch(notification, (recent) => {
  message.destroy();

  if (recent) {
    if (
      String(notification.value.notificationStatus)?.startsWith("4") ||
      String(notification.value.notificationStatus)?.startsWith("5") ||
      String(notification.value.notificationStatus) === "error"
    ) {
      message.error({
        content: () => `${notification.value.notificationMessage}`,
        class: "notify",
        key: "notification",
      });
    } else if (String(notification.value.notificationStatus)?.startsWith("3")) {
      message.warn({
        content: `${notification.value.notificationMessage}`,
        class: "notify",
        key: "notification-danger",
      });
    } else {
      message.success({
        content: `${notification.value.notificationMessage}`,
        class: "notify",
        key: "notification-danger",
      });
    }
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
