import { Row, Col, Card } from "antd";
import CountUpModule from "react-countup";

const CountUp = CountUpModule.default ?? CountUpModule;

const stats = [
  { value: 1000, suffix: "+", label: "Satisfied Patients" },
  { value: 250, suffix: "+", label: "Verified Doctors" },
  { value: 75, suffix: "+", label: "Specialist Doctors" },
];

const StatsSection = () => (
  <section style={{ padding: "64px 24px" }}>
    <Row gutter={[24, 24]} justify="center" style={{ maxWidth: 1200, margin: "0 auto" }}>
      {stats.map((s) => (
        <Col xs={24} sm={8} key={s.label}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(30,55,90,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "var(--hb-primary)",
              }}
            >
              <CountUp end={s.value} suffix={s.suffix} enableScrollSpy scrollSpyOnce duration={2} />
            </div>
            <div style={{ color: "var(--hb-text-light)", fontSize: 16, marginTop: 8 }}>
              {s.label}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </section>
);

export default StatsSection;
