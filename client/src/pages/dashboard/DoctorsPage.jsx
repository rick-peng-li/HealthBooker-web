import { useCallback, useEffect, useState } from "react";
import { Table, Avatar, Button, Popconfirm, App, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAllDoctors, deleteDoctor } from "@/api";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (err) {
      message.error(err.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (userId) => {
    try {
      await deleteDoctor(userId);
      message.success("Doctor removed successfully");
      fetchData();
    } catch (err) {
      message.error(err.message || "Failed to remove doctor");
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
      title: "Pic",
      key: "pic",
      render: (_, record) => (
        <Avatar src={record.userId?.pic} icon={<UserOutlined />} />
      ),
    },
    {
      title: "First Name",
      key: "firstname",
      render: (_, record) => record.userId?.firstname,
    },
    {
      title: "Last Name",
      key: "lastname",
      render: (_, record) => record.userId?.lastname,
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => record.userId?.email,
    },
    {
      title: "Mobile",
      key: "mobile",
      render: (_, record) => record.userId?.mobile || "N/A",
    },
    { title: "Specialization", dataIndex: "specialization", key: "specialization" },
    { title: "Experience", dataIndex: "experience", key: "experience" },
    {
      title: "Fees",
      dataIndex: "fees",
      key: "fees",
      render: (val) => `$${val}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Remove this doctor?"
          onConfirm={() => handleDelete(record.userId?._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="hb-table-card">
      <Typography.Title level={4}>All Doctors</Typography.Title>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={doctors}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default DoctorsPage;
