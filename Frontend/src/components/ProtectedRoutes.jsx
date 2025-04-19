import React, { use, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../redux/features/useAuth";
import Spinner from "./Spinner"; 
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";

import { setUsers } from "../redux/features/userSlice";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)

  // get user
  const getUser = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.get("http://localhost:8000/api/v1/users/me", {
        withCredentials: true, 
      });
      dispatch(hideLoading())
      if(res.data.success) {
        console.log(res.data);
        dispatch(setUsers(res.data.data))
      } else {
        <Navigate to="/login" />
      }
    } catch (error) {
      dispatch(hideLoading())
      console.error("Error during getting user data:", error);
    }
  }

  useEffect(() => {
    if(!user) {
      getUser()
    }
  }, [user, getUser])

  if (!authChecked) return <Spinner />; 

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
