import { Spin } from "antd";

const PageLoading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    <Spin size="large" />
  </div>
);

export default PageLoading;
