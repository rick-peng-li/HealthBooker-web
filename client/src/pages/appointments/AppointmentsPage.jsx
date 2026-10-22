import { useCallback, useEffect, useState } from "react";
import { Typography, Table, Tag, Button, Empty, App } from "antd";
import { getAllAppointments, completeAppointment } from "@/api";
import { getTokenPayload } from "@/utils/auth";
import { formatDateTime } from "@/utils/date";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();
  const userId = getTokenPayload()?.userId;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllAppointments(userId);
      setAppointments(data);
    } catch (err) {
      message.error(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, [userId, message]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleComplete = async (record) => {
    try {
      await completeAppointment({
        appointid: record._id,
        doctorId: record.doctorId?._id,
        doctorname: `${record.userId?.firstname || ""} ${record.userId?.lastname || ""}`,
      });
      message.success("Appointment marked as completed");
      fetchData();
    } catch (err) {
      message.error(err.message || "Failed to complete appointment");
    }
  };

  const columns = [
    {
      title: "S.No",
      key: "index",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Doctor",
      key: "doctor",
      render: (_, record) =>
        `Dr. ${record.doctorId?.firstname || ""} ${record.doctorId?.lastname || ""}`,
    },
    {
      title: "Patient",
      key: "patient",
      render: (_, record) =>
        `${record.userId?.firstname || ""} ${record.userId?.lastname || ""}`,
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },
    {
      title: "Booking Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => formatDateTime(val),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "Completed" ? (
          <Tag color="green">Completed</Tag>
        ) : (
          <Tag color="gold">Pending</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.doctorId?._id === userId ? (
          <Button
            type="primary"
            size="small"
            disabled={record.status === "Completed"}
            onClick={() => handleComplete(record)}
          >
            Complete
          </Button>
        ) : null,
    },
  ];

  return (
    <div className="hb-page">
      <Typography.Title level={2} className="hb-page-heading">
        Your Appointments
      </Typography.Title>
      <div className="hb-table-card">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={appointments}
          loading={loading}
          locale={{ emptyText: <Empty description="No appointments found" /> }}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
};

export default AppointmentsPage;
