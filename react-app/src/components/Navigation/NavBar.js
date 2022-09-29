import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import Logo from '../Images/Logo.png'
import LoginForm from '../auth/LoginForm';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const history = useHistory()
  const currentUser = useSelector(state => state.session.user);
  const [showLogin, setShowLogin] = useState(false)

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
            <div className='dropdown-container'>
              <div className='dropdown-button'>
                Click Me
              </div>
              <div className='dropdown-content'>
                <ul>
                  <li>
                    <NavLink to='/' exact={true} activeClassName='active'>
                      Home
                    </NavLink>
                  </li>
                  <li>
                  </li>
                  <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/users' exact={true} activeClassName='active'>
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
