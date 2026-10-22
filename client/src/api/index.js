import request from "./request";

// ---------- user ----------
export const login = (data) => request.post("/user/login", data);
export const register = (data) => request.post("/user/register", data);
export const getUser = (id) => request.get(`/user/getuser/${id}`);
export const getAllUsers = () => request.get("/user/getallusers");
export const updateProfile = (data) => request.put("/user/updateprofile", data);
export const deleteUser = (userId) =>
  request.delete("/user/deleteuser", { data: { userId } });

// ---------- doctor ----------
export const getAllDoctors = () => request.get("/doctor/getalldoctors");
export const getNotDoctors = () => request.get("/doctor/getnotdoctors");
export const applyForDoctor = (formDetails) =>
  request.post("/doctor/applyfordoctor", { formDetails });
export const acceptDoctor = (id) => request.put("/doctor/acceptdoctor", { id });
export const rejectDoctor = (id) => request.put("/doctor/rejectdoctor", { id });
export const deleteDoctor = (userId) =>
  request.put("/doctor/deletedoctor", { userId });

// ---------- appointment ----------
export const getAllAppointments = (search) =>
  request.get("/appointment/getallappointments", {
    params: search ? { search } : {},
  });
export const bookAppointment = (data) =>
  request.post("/appointment/bookappointment", data);
export const completeAppointment = (data) =>
  request.put("/appointment/completed", data);

// ---------- notification ----------
export const getAllNotifications = () =>
  request.get("/notification/getallnotifs");
