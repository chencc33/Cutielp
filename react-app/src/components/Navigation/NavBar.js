import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import Logo from '../Images/Logo.png'

const NavBar = () => {
  const history = useHistory()
  return (
    <>
      <div className='nav-bar' style={{ display: 'flex' }}>
        <div className='logo-container' style={{ display: 'flex' }}
          onClick={() => { history.push('/') }}>
          <img src={Logo} alt='Logo' height={50} width={50} />
          <p>Cutielp</p>
        </div>
        <div className='nav-bar-right' style={{ display: 'flex' }}>
          <div className='hostButton'>Business</div>
          <div>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
              {/* <img src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/000000/external-Log-in-social-media-bearicons-detailed-outline-bearicons.png" /> */}
            </NavLink>
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Signup
              {/* <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-Sign-Up-social-media-bearicons-glyph-bearicons.png" /> */}
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
