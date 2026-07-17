// src/routes/CustomerRoute.jsx

import ProtectedRoute from "./ProtectedRoute";


const CustomerRoute = ({
  children,
}) => {


  return (

    <ProtectedRoute
      allowedRoles={[
        "customer",
      ]}
    >

      {children}

    </ProtectedRoute>

  );

};


export default CustomerRoute;