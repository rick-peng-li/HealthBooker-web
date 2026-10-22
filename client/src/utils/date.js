import dayjs from "dayjs";

export const formatDate = (value) =>
  value ? dayjs(value).format("YYYY-MM-DD") : "-";

export const formatDateTime = (value) =>
  value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "-";
