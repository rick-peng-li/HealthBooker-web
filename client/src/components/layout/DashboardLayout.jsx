import { Suspense } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Typography, Space } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  FileTextOutlined,
  IdcardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import PageLoading from "@/components/common/PageLoading";
import { removeToken } from "@/utils/auth";

const { Sider, Content, Header } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: <NavLink to="/">Home</NavLink> },
    {
      key: "/dashboard/users",
      icon: <TeamOutlined />,
      label: <NavLink to="/dashboard/users">Users</NavLink>,
    },
    {
      key: "/dashboard/doctors",
      icon: <MedicineBoxOutlined />,
      label: <NavLink to="/dashboard/doctors">Doctors</NavLink>,
    },
    {
      key: "/dashboard/appointments",
      icon: <CalendarOutlined />,
      label: <NavLink to="/dashboard/appointments">Appointments</NavLink>,
    },
    {
      key: "/dashboard/applications",
      icon: <FileTextOutlined />,
      label: <NavLink to="/dashboard/applications">Applications</NavLink>,
    },
    {
      key: "/profile",
      icon: <IdcardOutlined />,
      label: <NavLink to="/profile">Profile</NavLink>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={220}
        theme="light"
        style={{ boxShadow: "2px 0 12px rgba(30,55,90,0.06)" }}
      >
        <div
          style={{
            padding: "20px 24px",
            fontSize: 20,
            fontWeight: 700,
            color: "var(--hb-primary)",
          }}
        >
          HealthBooker
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[location.pathname]}
          style={{ borderInlineEnd: "none" }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingInline: 24,
            boxShadow: "0 2px 12px rgba(30,55,90,0.06)",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            Admin Dashboard
          </Typography.Title>
          <Space>
            <Button icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Button>
          </Space>
        </Header>
        <Content style={{ padding: 24 }}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
