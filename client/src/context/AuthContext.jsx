import React, { createContext, useContext, useState } from 'react'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
const AuthContext=createContext();
export const AuthProvider = ({children}) => {
  const[user,setUser]=useState(null);
  const[token,setToken]=useState(localStorage.getItem("token") || null);
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
    const signUp= async ({username,email,password})=>{
      try{
        console.log(username,email,password);
        const res= await api.post("/auth/signup",{
          username,email,password
        });
        const data =res.data;
        localStorage.setItem("token",data.token);
        setUser(data.user);
        setToken(data.token);
        navigate("/");
        return data.message;
        

      }catch(error){
        return error.response?.data?.error ||"signUp failed";

      }

    }
    const signIn=async ({email,password})=>{
      try{
        const res= await api.post("/auth/signin",{
          email,password
        });
        const data=res.data;
        localStorage.setItem("token",data.token);
        setUser(data.user);
        setToken(data.token);
        navigate("/");
        return data.message;

      }catch(err){
        return err.response?.data?.error || "Signin Failed";


      }
        

    }
    const logout=()=>{
      localStorage.removeItem("token");
      setUser(null);
      navigate("auth");
    }
    
  return (
<AuthContext.Provider value={{token,user,signUp,signIn,logout}}>
    {children}
</AuthContext.Provider>
  )
}
export const useAuth=()=>{
  return useContext(AuthContext);
}
