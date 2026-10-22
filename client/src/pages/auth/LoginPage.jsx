import { Card, Form, Input, Button, Typography, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, getUser } from "@/api";
import { setToken, getTokenPayload } from "@/utils/auth";
import { setUserInfo } from "@/store/slices/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = App.useApp();

  const onFinish = async (values) => {
    try {
      const data = await login(values);
      setToken(data.token);
      const payload = getTokenPayload();
      const user = await getUser(payload.userId);
      dispatch(setUserInfo(user));
      message.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      message.error(err.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "linear-gradient(135deg, #e8f7fd 0%, #f0f6fb 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          maxWidth: "100%",
          borderRadius: 12,
          boxShadow: "0 12px 40px rgba(30,55,90,0.12)",
        }}
      >
        <Typography.Title level={3} style={{ textAlign: "center", color: "var(--hb-primary)" }}>
          HealthBooker
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: "center", color: "var(--hb-text-light)" }}>
          Log in to your account
        </Typography.Paragraph>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 5, message: "Password must be at least 5 characters" },
            ]}
          >
            <Input.Password placeholder="Password" autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Typography.Text type="secondary">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </Typography.Text>
          <br />
          <Link to="/">Back to home</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
