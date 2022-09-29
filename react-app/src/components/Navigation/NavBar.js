import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import Logo from '../Images/Logo.png'
import LoginForm from '../auth/LoginForm';

const NavBar = () => {
  const history = useHistory()

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <div className='nav-bar' style={{ display: 'flex' }}>
        <div className='logo-container' style={{ display: 'flex' }}
          onClick={() => { history.push('/') }}>
          <img src={Logo} alt='Logo' height={50} width={50} />
          <p className='logo-content'>Cutielp</p>
        </div>
        <div className='nav-bar-right' style={{ display: 'flex' }}>
          <div className='hostButton'>For Business</div>
          <div>
            <span onClick={() => { history.push('/login') }}>Login</span>
            {/* {showLogin && (<LoginForm />)} */}
            {/* <NavLink to='/login' exact={true} activeClassName='active'>
            </NavLink> */}
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign up
            </NavLink>
          </div>
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
        </div>
      </div>
    </>
  );
}

export default NavBar;
