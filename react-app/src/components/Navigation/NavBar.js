import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import Logo from '../Images/Logo.png'
import { useSelector } from 'react-redux';
// import User from '../User';
import BusinessForm from '../Businesses/BusinessForm';

const NavBar = ({ isSplash }) => {
  const history = useHistory()
  const currentUser = useSelector(state => state.session.user);
  // console.log('************current', currentUser)

  const redirect = () => {
    if (!currentUser) history.push('/login')
    else history.push('/businesses/create')
  }

  return (
    <>
      <div className='nav-bar' style={{
        backgroundColor: isSplash ? 'none' : '#c41200'
      }}>
        <div className='logo-container'
          onClick={() => { history.push('/') }}>
          <img src={Logo} alt='Logo' height={50} width={50} />
          <p className='logo-content'>Cutielp</p>
        </div>
        <div className='nav-bar-right'>
          <div className='hostButton'
            onClick={redirect}
          >Create a Business</div>
          {!currentUser && (
            <div className='login-signup'>
              <span className='splash-login' onClick={() => { history.push('/login') }}>Log In</span>
              <span className='splash-signup' onClick={() => { history.push('/sign-up') }}> Sign Up</span>
            </div>
          )}
          {currentUser && (
            <div className='dropdown-container'>
              <div className='profile-button'
                onClick={() => { history.push(`/users/${currentUser.id}`) }}>
                <img className='profile-button' src="https://img.icons8.com/carbon-copy/100/000000/test-account.png" height={30} width={30} />
              </div>
              <div className='dropdown-content'>
                <div className='dropdown-me'
                  onClick={() => { history.push('/businesses/current') }}>
                  <span><i className="fa-solid fa-house" style={{ marginRight: '5px' }}></i></span>My Business
                </div>
                <div className='dropdown-me'
                  onClick={() => { history.push('/reviews/current') }}>
                  <span><i className="fa-solid fa-star" style={{ marginRight: '5px' }}></i></span>My Reviews</div>
                <div className='dropdown-me' style={{ marginLeft: '3px' }}><LogoutButton /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
