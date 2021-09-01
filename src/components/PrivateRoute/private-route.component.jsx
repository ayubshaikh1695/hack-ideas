import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'context/auth-context-provider';

function PrivateRoute({ component, ...rest }) {
  let auth = useAuth();
  const Component = component;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user.isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
