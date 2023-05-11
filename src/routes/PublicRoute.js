import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { RoutersLinks } from '../constantes/RoutersLinks';

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={RoutersLinks.Form_insituciones} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoute;