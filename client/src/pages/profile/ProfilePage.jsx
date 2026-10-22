import { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  Avatar,
  Row,
  Col,
  Spin,
  App,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUser, updateProfile } from "@/api";
import { getTokenPayload } from "@/utils/auth";

const ProfilePage = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = getTokenPayload()?.userId;

  useEffect(() => {
    (async () => {
      try {
        const data = await getUser(userId);
        setUser(data);
        form.setFieldsValue({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          gender: data.gender || "neither",
          age: data.age ?? undefined,
          mobile: data.mobile ?? undefined,
          address: data.address || "",
        });
      } catch (err) {
        message.error(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, form, message]);

  const onFinish = async (values) => {
    const payload = { ...values };
    if (!payload.password) {
      delete payload.password;
    }
    delete payload.confirm;
    try {
      await updateProfile(payload);
      message.success("Profile updated successfully");
      form.setFieldsValue({ password: "", confirm: "" });
    } catch (err) {
      message.error(err.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="hb-page">
      <Typography.Title level={2} className="hb-page-heading">
        Your Profile
      </Typography.Title>
      <Card
        style={{
          maxWidth: 720,
          margin: "0 auto",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(30,55,90,0.06)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Avatar size={96} src={user?.pic} icon={<UserOutlined />} />
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input placeholder="First name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="gender" label="Gender">
                <Select
                  options={[
                    { value: "neither", label: "Prefer not to say" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="age" label="Age">
                <InputNumber min={0} max={150} style={{ width: "100%" }} placeholder="Age" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="mobile" label="Mobile">
            <Input placeholder="Mobile number" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea rows={2} placeholder="Address" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                label="New Password"
                tooltip="Leave blank to keep current password"
              >
                <Input.Password placeholder="Leave blank to keep current" autoComplete="new-password" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="confirm"
                label="Confirm New Password"
                dependencies={["password"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!getFieldValue("password") || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" autoComplete="new-password" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
