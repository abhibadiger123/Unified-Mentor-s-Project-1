// src/routes/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Loading from "../components/Loading";


const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {


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
        message="Checking user..."
      />

    );

  }




  // ============================
  // User Not Logged In
  // ============================

  if (!isAuthenticated) {

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
  // Role Checking
  // ============================

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {

    return (

      <Navigate
        to="/"
        replace
      />

    );

  }





  // ============================
  // Authorized
  // ============================

  return children;


};


export default ProtectedRoute;