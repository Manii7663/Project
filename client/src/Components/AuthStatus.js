// AuthStatus.js
import React from 'react';
import { useAuth } from '../context/authContext';

function AuthStatus() {
  const {isAuthenticated,User} = useAuth();
  
  console.log(isAuthenticated);
  console.log(User);

  return (
    <div>
      <h2>Authentication Status:</h2>
      <p>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
    </div>
  );
}

export default AuthStatus;
