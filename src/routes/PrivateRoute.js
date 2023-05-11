import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../context/authContext';
import { RoutersLinks } from '../constantes/RoutersLinks';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={RoutersLinks.Login} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoute;