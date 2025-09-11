// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authContext } from "../store/authStore";
import ChefProvider from "../store/ChefdataStore";
import RequestContextProvider from "../store/requestStore";
import Header from "./Header";
import BookingContextProvider from "../store/bookingStore";
import UserContextProvider from "../store/userStore";
const ProtectedRoute = ({ children }) => {
  const location=useLocation();
  const { loginstate } = useContext(authContext);
  return loginstate ? (
    <>
      <ChefProvider>
        <RequestContextProvider>
          <BookingContextProvider>
            <UserContextProvider>
            <Header />
            <Outlet />
            </UserContextProvider>
          </BookingContextProvider>
        </RequestContextProvider>
      </ChefProvider>
    </>
  ) : (
    <Navigate to="/unauthorized" replace state={{ from: location }}/>
  );
};

export default ProtectedRoute;
