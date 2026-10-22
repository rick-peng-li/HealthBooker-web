import { Form, Input, Button, Typography, Card, App } from "antd";

const ContactSection = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  const onFinish = async (values) => {
    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      }
      message.success("Your message has been sent successfully");
      form.resetFields();
    } catch {
      message.error("Failed to send message, please try again later");
    }
  };

  return (
    <section id="contact" style={{ padding: "64px 24px", background: "#fff" }}>
      <Typography.Title level={2} className="hb-page-heading">
        Contact Us
      </Typography.Title>
      <Card
        style={{
          maxWidth: 560,
          margin: "0 auto",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(30,55,90,0.06)",
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Your email" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="How can we help you?" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Send Message
          </Button>
        </Form>
      </Card>
    </section>
  );
};

export default ContactSection;
