import React, { useState, useContext, useEffect } from 'react';
import { navigate } from '@reach/router';
import { session } from './api';

const UserContext = React.createContext();
const SetUserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUserSession() {
      try {
        const user = await session();
        setUser(user);
      } catch (e) {
        setUser();
        navigate('/signin');
      }
    }
    getUserSession();
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  )
}

function useUser() {
  return useContext(UserContext);
}

function useSetUser() {
  const context = useContext(SetUserContext);
  if (context === undefined) {
    throw new Error('useSetUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser, useSetUser };