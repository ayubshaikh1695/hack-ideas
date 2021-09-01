import React from 'react';
import RootRoutes from 'components/RootRoutes/root-routes.component';
import AuthContextProvider from 'context/auth-context-provider';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <div className='app-wrapper'>
        <RootRoutes />
      </div>
    </AuthContextProvider>
  );
}

export default App;
