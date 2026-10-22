import { useState } from "react";
import { Card, Form, Input, Button, Typography, Upload, Avatar, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { register } from "@/api";
import { uploadImage, readFileAsDataUrl } from "@/utils/upload";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const beforeUpload = async (f) => {
    const isImg = ["image/jpeg", "image/png"].includes(f.type);
    if (!isImg) {
      message.error("Only JPG/PNG images are allowed");
      return Upload.LIST_IGNORE;
    }
    setFile(f);
    setPreview(await readFileAsDataUrl(f));
    return false;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let pic = "";
      if (file) {
        pic = await uploadImage(file);
      }
      await register({ ...values, pic });
      message.success("Registered successfully, please log in");
      navigate("/login");
    } catch (err) {
      message.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
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
          width: 440,
          maxWidth: "100%",
          borderRadius: 12,
          boxShadow: "0 12px 40px rgba(30,55,90,0.12)",
        }}
      >
        <Typography.Title level={3} style={{ textAlign: "center", color: "var(--hb-primary)" }}>
          Create Account
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item label="Avatar (optional)" style={{ textAlign: "center" }}>
            <Upload
              accept="image/jpeg,image/png"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {preview ? (
                <Avatar size={72} src={preview} style={{ cursor: "pointer" }} />
              ) : (
                <div
                  style={{
                    width: 72,
                    height: 72,
                    border: "1px dashed #d9d9d9",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <PlusOutlined />
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true, message: "Please enter your first name" }]}
          >
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
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
            hasFeedback
          >
            <Input.Password placeholder="Password" autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" autoComplete="new-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Typography.Text type="secondary">
            Already have an account? <Link to="/login">Login</Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
