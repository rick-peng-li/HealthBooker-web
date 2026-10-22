import { Card, Form, Input, InputNumber, Button, Typography, App } from "antd";
import { useNavigate } from "react-router-dom";
import { applyForDoctor } from "@/api";

const ApplyDoctorPage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = async (values) => {
    try {
      await applyForDoctor(values);
      message.success("Doctor application submitted successfully");
      navigate("/");
    } catch (err) {
      message.error(err.message || "Failed to submit application");
    }
  };

  return (
    <div className="hb-page">
      <Typography.Title level={2} className="hb-page-heading">
        Apply for Doctor
      </Typography.Title>
      <Card
        style={{
          maxWidth: 560,
          margin: "0 auto",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(30,55,90,0.06)",
        }}
      >
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="specialization"
            label="Specialization"
            rules={[{ required: true, message: "Please enter your specialization" }]}
          >
            <Input placeholder="e.g. Cardiologist" />
          </Form.Item>
          <Form.Item
            name="experience"
            label="Experience (years)"
            rules={[{ required: true, message: "Please enter your experience" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Years of experience" />
          </Form.Item>
          <Form.Item
            name="fees"
            label="Fees per consultation ($)"
            rules={[{ required: true, message: "Please enter your fees" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Consultation fees" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit Application
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ApplyDoctorPage;
