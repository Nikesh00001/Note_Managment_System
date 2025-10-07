import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({children}) => {
    const{token}=useAuth();
    const navigate=useNavigate();
    useEffect(()=>{
        if(!token){
            navigate("/auth",{replace:true});
        }


    },[token,navigate]);
    if(!token) return null;

  return children;
}

export default ProtectedRoute;