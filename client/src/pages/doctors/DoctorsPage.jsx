import { useEffect, useState } from "react";
import { Typography, Empty, Spin, App } from "antd";
import DoctorCard from "@/components/doctors/DoctorCard";
import { getAllDoctors } from "@/api";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (err) {
        message.error(err.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    })();
  }, [message]);

  return (
    <div className="hb-page">
      <Typography.Title level={2} className="hb-page-heading">
        Our Doctors
      </Typography.Title>
      {loading ? (
        <div style={{ textAlign: "center", padding: 48 }}>
          <Spin size="large" />
        </div>
      ) : doctors.length === 0 ? (
        <Empty description="No doctors available yet" />
      ) : (
        <div className="hb-card-grid">
          {doctors.map((doc) => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
