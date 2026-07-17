// src/routes/PublicRoute.jsx

import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Loading from "../components/Loading";


const PublicRoute = ({
  children,
}) => {


  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();





  // ============================
  // Checking Authentication
  // ============================

  if (loading) {

    return (

      <Loading
        fullScreen
        message="Loading..."
      />

    );

  }





  // ============================
  // Redirect Logged User
  // ============================

  if (isAuthenticated && user) {


    switch (user.role) {


      case "customer":

        return (

          <Navigate
            to="/customer/dashboard"
            replace
          />

        );



      case "agency":

        return (

          <Navigate
            to="/agency/dashboard"
            replace
          />

        );



      case "admin":

        return (

          <Navigate
            to="/admin/dashboard"
            replace
          />

        );



      default:

        return (

          <Navigate
            to="/"
            replace
          />

        );


    }

  }





  // ============================
  // Allow Public Access
  // ============================

  return children;


};


export default PublicRoute;