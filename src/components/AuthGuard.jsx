import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/users/userSlice';

import Login from './login/Login';
import OverView from './overview/OverView'

export default function AuthGuard() { 
  const user = useSelector(selectUser)

  return (
    <>
      {user ? <OverView /> : <Login />}
    </>
  )
}