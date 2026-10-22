import { Suspense } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Dropdown, Space, Grid, Drawer } from "antd";
import { useState } from "react";
import {
  UserOutlined,
  MenuOutlined,
  DownOutlined,
  LogoutOutlined,
  IdcardOutlined,
  CalendarOutlined,
  BellOutlined,
  MedicineBoxOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Footer from "./Footer";
import PageLoading from "@/components/common/PageLoading";
import { getToken, removeToken, isAdminUser } from "@/utils/auth";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = getToken();
  const isAdmin = isAdminUser();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  const navItems = [
    { key: "/", label: <NavLink to="/">Home</NavLink> },
    { key: "/doctors", label: <NavLink to="/doctors">Doctors</NavLink> },
  ];

  const userMenuItems = token
    ? [
        { key: "profile", icon: <IdcardOutlined />, label: "Profile", onClick: () => navigate("/profile") },
        { key: "appointments", icon: <CalendarOutlined />, label: "Appointments", onClick: () => navigate("/appointments") },
        { key: "notifications", icon: <BellOutlined />, label: "Notifications", onClick: () => navigate("/notifications") },
        { key: "apply", icon: <MedicineBoxOutlined />, label: "Apply for doctor", onClick: () => navigate("/applyfordoctor") },
        ...(isAdmin
          ? [{ key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard", onClick: () => navigate("/dashboard") }]
          : []),
        { type: "divider" },
        { key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: logout },
      ]
    : [];

  const selectedKey = navItems.some((i) => i.key === location.pathname)
    ? location.pathname
    : undefined;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          background: "#fff",
          paddingInline: 24,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(30,55,90,0.08)",
        }}
      >
        <NavLink
          to="/"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--hb-primary)",
            whiteSpace: "nowrap",
          }}
        >
          HealthBooker
        </NavLink>

        {screens.md ? (
          <>
            <Menu
              mode="horizontal"
              items={navItems}
              selectedKeys={selectedKey ? [selectedKey] : []}
              style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
            />
            {token ? (
              <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
                <Space style={{ cursor: "pointer" }}>
                  <Avatar icon={<UserOutlined />} />
                  <DownOutlined style={{ fontSize: 12 }} />
                </Space>
              </Dropdown>
            ) : (
              <Space size="middle">
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button type="primary" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Space>
            )}
          </>
        ) : (
          <>
            <div style={{ flex: 1 }} />
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setDrawerOpen(true)}
            />
            <Drawer
              title="HealthBooker"
              placement="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Menu
                mode="vertical"
                selectedKeys={selectedKey ? [selectedKey] : []}
                items={navItems}
                onClick={() => setDrawerOpen(false)}
                style={{ borderInlineEnd: "none" }}
              />
              {token ? (
                <Menu
                  mode="vertical"
                  items={userMenuItems.filter((i) => i.type !== "divider")}
                  onClick={() => setDrawerOpen(false)}
                  style={{ borderInlineEnd: "none", marginTop: 16 }}
                />
              ) : (
                <Space direction="vertical" style={{ width: "100%", marginTop: 16 }}>
                  <Button block onClick={() => { setDrawerOpen(false); navigate("/login"); }}>
                    Login
                  </Button>
                  <Button
                    block
                    type="primary"
                    onClick={() => { setDrawerOpen(false); navigate("/register"); }}
                  >
                    Register
                  </Button>
                </Space>
              )}
            </Drawer>
          </>
        )}
      </Header>

      <Content>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </Content>

      <Footer />
    </Layout>
  );
};

export default MainLayout;
