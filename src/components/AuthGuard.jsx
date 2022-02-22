import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/users/userSlice';

import Login from './login/Login';
import OverView from './dashboard/Dashboard'

export default function AuthGuard() { 
  const user = useSelector(selectUser) 
  return (
    <>
      {user ? <OverView /> : <Login />}
    </>
  )
}