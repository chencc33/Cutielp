import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import Logo from '../Images/Logo.png'
import LoginForm from '../auth/LoginForm';
import { useSelector } from 'react-redux';
import User from '../User';

const NavBar = () => {
  const history = useHistory()
  const currentUser = useSelector(state => state.session.user);
  console.log('************current', currentUser)

  return (
    <>
      <div className='nav-bar'>
        <div className='logo-container'
          onClick={() => { history.push('/') }}>
          <img src={Logo} alt='Logo' height={50} width={50} />
          <p className='logo-content'>Cutielp</p>
        </div>
        <div className='nav-bar-right'>
          <div className='hostButton'>Create a Business</div>
          {!currentUser && (
            <div className='login-signup'>
              <span className='splash-login' onClick={() => { history.push('/login') }}>Log In</span>
              <span className='splash-signup' onClick={() => { history.push('/sign-up') }}> Sign Up</span>
            </div>
          )}
          {currentUser && (
            <div className='profile-button'
              onClick={() => { history.push(`/users/${currentUser.id}`) }}>
              <img src="https://img.icons8.com/carbon-copy/100/000000/test-account.png" height={30} width={30} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
