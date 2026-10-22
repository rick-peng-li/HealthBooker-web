import { useState } from "react";
import { Card, Avatar, Button, Typography, App } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BookAppointmentModal from "./BookAppointmentModal";
import { getToken } from "@/utils/auth";

const DEFAULT_AVATAR =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const DoctorCard = ({ doctor }) => {
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();

  const user = doctor.userId || {};
  const fullName = `Dr. ${user.firstname || ""} ${user.lastname || ""}`.trim();

  const handleBook = () => {
    if (!getToken()) {
      message.error("You must log in first");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <Card
        hoverable
        style={{ borderRadius: 12, textAlign: "center" }}
        styles={{ body: { padding: 24 } }}
      >
        <Avatar
          size={88}
          src={user.pic || DEFAULT_AVATAR}
          icon={<UserOutlined />}
          style={{ marginBottom: 12 }}
        />
        <Typography.Title level={4} style={{ marginBottom: 4 }}>
          {fullName}
        </Typography.Title>
        <Typography.Text type="secondary" style={{ display: "block" }}>
          {doctor.specialization}
        </Typography.Text>
        <div style={{ margin: "12px 0", color: "var(--hb-text-light)" }}>
          <div>Experience: {doctor.experience} years</div>
          <div>Fees: ${doctor.fees} per consultation</div>
          <div>Phone: {user.mobile || "N/A"}</div>
        </div>
        <Button type="primary" block onClick={handleBook}>
          Book Appointment
        </Button>
      </Card>
      <BookAppointmentModal
        doctor={doctor}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default DoctorCard;
