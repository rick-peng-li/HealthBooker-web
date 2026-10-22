import { useCallback, useEffect, useState } from "react";
import { Table, Avatar, Button, Popconfirm, Space, App, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getNotDoctors, acceptDoctor, rejectDoctor } from "@/api";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotDoctors();
      setApplications(data);
    } catch (err) {
      message.error(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAccept = async (id) => {
    try {
      await acceptDoctor(id);
      message.success("Application accepted");
      fetchData();
    } catch (err) {
      message.error(err.message || "Failed to accept application");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectDoctor(id);
      message.success("Application rejected");
      fetchData();
    } catch (err) {
      message.error(err.message || "Failed to reject application");
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
        <Space>
          <Popconfirm
            title="Accept this application?"
            onConfirm={() => handleAccept(record.userId?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small">
              Accept
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Reject this application?"
            onConfirm={() => handleReject(record.userId?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">
              Reject
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="hb-table-card">
      <Typography.Title level={4}>Doctor Applications</Typography.Title>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={applications}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default ApplicationsPage;
