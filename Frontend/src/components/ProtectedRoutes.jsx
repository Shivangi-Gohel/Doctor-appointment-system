import React, { use, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../redux/features/useAuth";
import Spinner from "./Spinner"; 
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";

import { setUsers } from "../redux/features/userSlice";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  const navigate = useNavigate()
  

  // get user
  const getUser = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.get("http://localhost:8000/api/v1/users/me", {
        withCredentials: true, 
      });
      dispatch(hideLoading())
      if(res.data.success) {
        dispatch(setUsers(res.data.data))
      } else {
        navigate("/login")
      }
    } catch (error) {
      dispatch(hideLoading())
      navigate("/login")
      console.error("Error during getting user data:", error);
    }
  }

  useEffect(() => {
    if(!user) {
      getUser()
    }
  }, [user, getUser])

  if (!authChecked) return <Spinner />; 

  if (!isAuthenticated) return navigate("/login");

  return children;
};

export default ProtectedRoute;
