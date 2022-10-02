import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <span onClick={onLogout} ><i className="fa-solid fa-right-from-bracket" style={{ marginRight: '5px' }}></i>Logout</span>
  );
};

export default LogoutButton;
