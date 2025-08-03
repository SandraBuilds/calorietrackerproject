import React, { createContext, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  const login = (u) => {
    setUser(u);
    localStorage.setItem('user', u);
  };

  const logout = () => {
    setUser('');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
