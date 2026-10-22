import { Modal, Form, DatePicker, TimePicker, App } from "antd";
import dayjs from "dayjs";
import { bookAppointment } from "@/api";

const BookAppointmentModal = ({ doctor, open, onClose }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const onFinish = async (values) => {
    const payload = {
      doctorId: doctor.userId._id,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("HH:mm"),
      doctorname: `${doctor.userId.firstname} ${doctor.userId.lastname}`,
    };
    try {
      await bookAppointment(payload);
      message.success("Appointment booked successfully");
      form.resetFields();
      onClose();
    } catch (err) {
      message.error(err.message || "Failed to book appointment");
    }
  };

  return (
    <Modal
      title={`Book Appointment — Dr. ${doctor.userId?.firstname || ""} ${doctor.userId?.lastname || ""}`}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Book"
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <TimePicker style={{ width: "100%" }} format="HH:mm" minuteStep={15} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookAppointmentModal;
