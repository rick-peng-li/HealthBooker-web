import { Row, Col, Typography } from "antd";
import aboutImg from "@/assets/images/aboutimg.jpg";

const AboutUs = () => (
  <section style={{ padding: "64px 24px", background: "#fff" }}>
    <Row
      align="middle"
      justify="center"
      gutter={[48, 32]}
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <Col xs={24} md={12} style={{ textAlign: "center" }}>
        <img
          src={aboutImg}
          alt="About us"
          style={{
            maxWidth: "100%",
            maxHeight: 320,
            borderRadius: 16,
            boxShadow: "0 12px 40px rgba(30,55,90,0.12)",
            objectFit: "cover",
          }}
        />
      </Col>
      <Col xs={24} md={12}>
        <Typography.Title level={2} style={{ color: "var(--hb-text-bold)" }}>
          About Us
        </Typography.Title>
        <Typography.Paragraph
          style={{ color: "var(--hb-text-light)", fontSize: 16 }}
        >
          HealthBooker connects patients with experienced, verified doctors
          across a wide range of specializations. Our mission is to make
          healthcare booking effortless — browse doctors, check their
          expertise, and secure an appointment in seconds.
        </Typography.Paragraph>
        <Typography.Paragraph
          style={{ color: "var(--hb-text-light)", fontSize: 16 }}
        >
          From general physicians to specialists, every doctor on our platform
          is reviewed by our admin team to ensure you always receive trusted,
          quality care.
        </Typography.Paragraph>
      </Col>
    </Row>
  </section>
);

export default AboutUs;
