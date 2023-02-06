import axios from 'axios';
import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { URL } from '../constant/variable';
export const AuthContext = createContext(null);
export const AuthContexProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  function deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
  const login = async (inputs: any) => {
    console.log('vao login');
    const res = await axios.post(`${URL}/auth/login`, inputs, {
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin'
      }
    });
    console.log('response login ', res);
    document.cookie = 'access_token=' + res.data.access_token;
    setCurrentUser(res.data);
  };

  const logout = async (inputs: any) => {
    console.log('vao logout');
    await axios.post(`${URL}/auth/logout`);
    setCurrentUser(null);
    localStorage.clear();
    deleteAllCookies();
  };

  useEffect(() => {
    console.log('currentUser change ', currentUser);
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('access_token', currentUser.access_token);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  );
};
