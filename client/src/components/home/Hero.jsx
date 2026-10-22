import { Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/images/heroimg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #e8f7fd 0%, #f0f6fb 100%)",
        padding: "64px 24px",
      }}
    >
      <Row
        align="middle"
        justify="center"
        gutter={[48, 32]}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <Col xs={24} md={12}>
          <Typography.Title
            style={{
              color: "var(--hb-text-bold)",
              fontSize: 44,
              lineHeight: 1.2,
            }}
          >
            Your Health, <span style={{ color: "var(--hb-primary)" }}>Our Responsibility</span>
          </Typography.Title>
          <Typography.Paragraph
            style={{ color: "var(--hb-text-light)", fontSize: 16, maxWidth: 480 }}
          >
            Find and book appointments with verified specialist doctors in just
            a few clicks. Quality healthcare, made simple and accessible for
            everyone.
          </Typography.Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/doctors")}
            style={{ marginTop: 8 }}
          >
            Book an Appointment
          </Button>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <img
            src={heroImg}
            alt="Healthcare"
            style={{
              maxWidth: "100%",
              maxHeight: 360,
              borderRadius: 16,
              boxShadow: "0 12px 40px rgba(30,55,90,0.15)",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Hero;
