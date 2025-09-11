import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/Login.jsx";
import LoginRequiredMessage from "./components/LoginRequiredMessage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Booking from "./components/Booking.jsx";
import Chefs from "./components/Chefs.jsx";
import AddChef from "./components/AddChef.jsx";
import Users from "./components/User.jsx";
import ContactRequest from "./components/Contactrequests.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/",element:(<ProtectedRoute></ProtectedRoute>),
        children: [
          {path: "/",element: <Dashboard />,},
          {path: "/bookings",element: <Booking />,},
          {path:"/chefs",element:<Chefs/>},
          {path:"/addchef",element:<AddChef/>},
          {path:"/users",element:<Users/>},
          {path:"/contact-requests",element:<ContactRequest/>},
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/unauthorized", element: <LoginRequiredMessage /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
