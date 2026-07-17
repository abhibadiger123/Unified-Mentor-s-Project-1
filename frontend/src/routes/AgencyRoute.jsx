// src/routes/AgencyRoute.jsx

import ProtectedRoute from "./ProtectedRoute";


const AgencyRoute = ({
  children,
}) => {


  return (

    <ProtectedRoute

      allowedRoles={[
        "agency",
        "admin",
      ]}

    >

      {children}

    </ProtectedRoute>

  );

};


export default AgencyRoute;