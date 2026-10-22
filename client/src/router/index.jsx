import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Protected, Public, Admin } from "./guards";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const DoctorsPage = lazy(() => import("@/pages/doctors/DoctorsPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const AppointmentsPage = lazy(() =>
  import("@/pages/appointments/AppointmentsPage")
);
const NotificationsPage = lazy(() =>
  import("@/pages/notifications/NotificationsPage")
);
const ApplyDoctorPage = lazy(() =>
  import("@/pages/apply-doctor/ApplyDoctorPage")
);
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const UsersPage = lazy(() => import("@/pages/dashboard/UsersPage"));
const AdminDoctorsPage = lazy(() => import("@/pages/dashboard/DoctorsPage"));
const ApplicationsPage = lazy(() =>
  import("@/pages/dashboard/ApplicationsPage")
);
const AdminAppointmentsPage = lazy(() =>
  import("@/pages/dashboard/AppointmentsPage")
);
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/doctors", element: <DoctorsPage /> },
      {
        path: "/appointments",
        element: (
          <Protected>
            <AppointmentsPage />
          </Protected>
        ),
      },
      {
        path: "/notifications",
        element: (
          <Protected>
            <NotificationsPage />
          </Protected>
        ),
      },
      {
        path: "/applyfordoctor",
        element: (
          <Protected>
            <ApplyDoctorPage />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <ProfilePage />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Public>
        <LoginPage />
      </Public>
    ),
  },
  {
    path: "/register",
    element: (
      <Public>
        <RegisterPage />
      </Public>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Admin>
        <DashboardLayout />
      </Admin>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard/users" replace /> },
      { path: "users", element: <UsersPage /> },
      { path: "doctors", element: <AdminDoctorsPage /> },
      { path: "appointments", element: <AdminAppointmentsPage /> },
      { path: "applications", element: <ApplicationsPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
