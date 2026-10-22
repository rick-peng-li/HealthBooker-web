import { useEffect, useState } from "react";
import { Typography, Table, Empty, App } from "antd";
import { getAllNotifications } from "@/api";
import { formatDateTime } from "@/utils/date";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllNotifications();
        setNotifications(data);
      } catch (err) {
        message.error(err.message || "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    })();
  }, [message]);

  const columns = [
    {
      title: "S.No",
      key: "index",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val) => formatDateTime(val),
      width: 200,
    },
  ];

  return (
    <div className="hb-page">
      <Typography.Title level={2} className="hb-page-heading">
        Your Notifications
      </Typography.Title>
      <div className="hb-table-card">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={notifications}
          loading={loading}
          locale={{ emptyText: <Empty description="No notifications found" /> }}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
};

export default NotificationsPage;
