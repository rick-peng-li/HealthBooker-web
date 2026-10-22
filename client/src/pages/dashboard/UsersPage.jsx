import { useCallback, useEffect, useState } from "react";
import { Table, Tag, Avatar, Button, Popconfirm, App, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAllUsers, deleteUser } from "@/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      message.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      message.success("User removed successfully");
      fetchData();
    } catch (err) {
      message.error(err.message || "Failed to remove user");
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
      dataIndex: "pic",
      key: "pic",
      render: (pic) => <Avatar src={pic} icon={<UserOutlined />} />,
    },
    { title: "First Name", dataIndex: "firstname", key: "firstname" },
    { title: "Last Name", dataIndex: "lastname", key: "lastname" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (val) => val || "N/A",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (val) => val ?? "N/A",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (val) => val || "N/A",
    },
    {
      title: "Is Doctor",
      dataIndex: "isDoctor",
      key: "isDoctor",
      render: (val) => (val ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Remove this user?"
          description="This will also remove related appointments and notifications."
          onConfirm={() => handleDelete(record._id)}
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
      <Typography.Title level={4}>All Users</Typography.Title>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default UsersPage;
