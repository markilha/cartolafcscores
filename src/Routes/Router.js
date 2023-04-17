import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/contextAuth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed, loading} = useContext(AuthContext);

  if (loading) {
    return <div>Carregando....</div>;
  } else {
    if (!signed && isPrivate) {
      return <Redirect to="/" />;
    }
    if (signed && !isPrivate) {
      return <Redirect to="/home" />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
}


