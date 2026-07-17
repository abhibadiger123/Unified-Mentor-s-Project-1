// src/components/ProtectedLayout.jsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";


const ProtectedLayout = () => {

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();


  const location = useLocation();



  // ============================
  // Checking Authentication
  // ============================

  if (loading) {

    return (

      <Loading
        fullScreen
        message="Checking authentication..."
        size="large"
      />

    );

  }



  // ============================
  // Not Logged In
  // ============================

  if (!isAuthenticated || !user) {

    return (

      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />

    );

  }



  // ============================
  // Authorized User
  // ============================

  return (

    <Outlet />

  );

};


export default ProtectedLayout;
