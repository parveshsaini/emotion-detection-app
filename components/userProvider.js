import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '@/helpers/context';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const getDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data.data.username);
    return res.data.data.username;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userName = await getDetails();
      setUser(userName);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
