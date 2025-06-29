import React, { createContext, useContext,useEffect,useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth =()=> useContext(AuthContext);
 const url= "https://restofodieleon-backend.onrender.com";

 const api = axios.create({
  baseURL: url,
  withCredentials: true, 
});

export const AuthProvider = ({children})=>{
  const [user, setUser] = useState(null); 
  const [accessToken, setAccessToken] = useState(null);
 

   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('accessToken');
    if (storedUser && token) {
      setUser(storedUser);
      setAccessToken(token);
    }
  }, []);
  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password }, { withCredentials: true });
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('accessToken', res.data.accessToken);
      return { success: true,user:res.data.user };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

   const signup = async ({ name, email, password, role = 'customer' }) => {
    try {
          const res = await api.post('/api/auth/signup', { name, email, password, role });
       console.log("Signup success:", res.data);
      return { success: true };
    } catch (err) {
       console.error("Signup error:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

   const logout = async () => {
    await api.post('/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };
  return(
    <AuthContext.Provider value={{user, setUser, accessToken, setAccessToken, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  )
}