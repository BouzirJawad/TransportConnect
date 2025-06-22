import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { DriverRoutes } from "./DriverRoutes";
import { ShipperRoutes } from "./ShipperRoutes";

import LoginRegisterWrapper from "../screens/Auth/LoginRegisterWrapper";
import Landing from "../screens/Public/Landing";
import ProfilePage from "../screens/Profile/ProfilePage";
import DriverDashboard from "../screens/Driver/DriverDashboard";
import ViewAnnouncement from "../screens/Driver/ViewAnnouncement";

const Routes = () => {
  const { token, user } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  const authOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ];

  const noAuthOnly = [
    {
      path: "/login",
      element: <LoginRegisterWrapper />, // Replace with <Login />
    },
    {
      path: "/register",
      element: <LoginRegisterWrapper />, // Replace with <Register />
    },
  ];

  const shipperOnly = [
    {
      path: "/shipper",
      element: <ShipperRoutes />,
      children: [
        {
          path: "dashboard",
          element: <div>Shipper Dashboard</div>, // Replace with <ShipperDashboard />
        },
        {
          path: "announcements",
          element: <div>Browse Announcements</div>, // Replace with <ShipperBrowseAnnouncements />
        },
        {
          path: "announcement/:id",
          element: <div>Announcement Details</div>, // Replace with <AnnouncementDetails />
        },
        {
          path: "create-demand/:announcementId",
          element: <div>Create Demand</div>, // Replace with <CreateDemand />
        },
        {
          path: "history",
          element: <div>My Demands History</div>, // Replace with <DemandHistory />
        },
      ],
    },
  ];

  const driverOnly = {
    path: "/driver",
    element: <DriverRoutes />,
    children: [
      {
        path: "dashboard",
        element: <DriverDashboard />,
      },
      {
        path: "announcement/:id",
        element: <ViewAnnouncement />
      }
    ],
  };

  const adminOnly = {
    path: "/admin",
    element: <AdminRoutes />,
    children: [
      {
        path: "dashboard",
        element: <div>Admin Dashboard</div>,
      },
      {
        path: "manage-users",
        element: <div>Manage Users</div>,
      },
      {
        path: "manage-announcements",
        element: <div>Manage Announcements</div>,
      },
      {
        path: "manage-demands",
        element: <div>Manage Demands</div>,
      },
    ],
  };

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(token ? authOnly : []),
    ...(!token ? noAuthOnly : []),
    ...(user?.isAdmin ? [adminOnly] : []),
    ...(user?.isDriver ? [driverOnly] : []),
    ...(user && !user?.isDriver ? shipperOnly : [])
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
