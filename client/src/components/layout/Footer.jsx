import { Layout, Space, Typography, Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import {
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;

const linkStyle = { color: "rgba(255,255,255,0.75)" };

const Footer = () => (
  <AntFooter
    style={{
      background: "var(--hb-text-bold)",
      color: "rgba(255,255,255,0.75)",
      padding: "40px 24px",
    }}
  >
    <Row justify="space-between" align="middle" gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Typography.Title level={4} style={{ color: "#fff", margin: 0 }}>
          HealthBooker
        </Typography.Title>
        <Typography.Paragraph
          style={{ color: "rgba(255,255,255,0.6)", marginTop: 8, marginBottom: 0 }}
        >
          Book appointments with trusted doctors, anytime.
        </Typography.Paragraph>
      </Col>
      <Col xs={24} md={8}>
        <Space size="large" wrap>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/doctors" style={linkStyle}>
            Doctors
          </NavLink>
          <NavLink to="/appointments" style={linkStyle}>
            Appointments
          </NavLink>
          <NavLink to="/notifications" style={linkStyle}>
            Notifications
          </NavLink>
        </Space>
      </Col>
      <Col xs={24} md={8}>
        <Space size="large" style={{ fontSize: 20 }}>
          <a
            href="https://github.com/rick-peng-li/HealthBooker-web"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            <GithubOutlined />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={linkStyle}>
            <TwitterOutlined />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={linkStyle}>
            <LinkedinOutlined />
          </a>
        </Space>
      </Col>
    </Row>
    <div
      style={{
        textAlign: "center",
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      © {new Date().getFullYear()} HealthBooker. All rights reserved.
    </div>
  </AntFooter>
);

export default Footer;
