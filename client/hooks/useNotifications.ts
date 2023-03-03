import { notification } from "antd";
import { useState } from "react";
type NotificationType = "success" | "info" | "warning" | "error";
export default function useNotifications() {
  const [api, contextHolder] = notification.useNotification();
  const showMsg = (_msg: string, type: NotificationType) => {
    api[type]({
      message: titleOfType(type),
      description: _msg,
      placement: "bottomRight",
    });
  };
  return [showMsg, contextHolder];
}
function titleOfType(type: NotificationType) {
  switch (type) {
    case "success":
      return "Hoàn tất";
    case "error":
      return "Có lỗi xảy ra";
  }
}
