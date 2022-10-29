import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Navigation.css';
import Logo from '../Images/Logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import SearchBar from './SearchBar';
import ListBusinessPage from './ListBusinessPage';
import { getBusinesses } from '../../store/business';


const NavBar = ({ isSplash }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user);

  const businesses = useSelector(state => state.businesses)
  const businessesArr = Object.values(businesses)

  const [searchInput, setSearchInput] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    dispatch(getBusinesses())
  }, [])



  const redirect = () => {
    if (!currentUser) history.push('/login')
    else history.push('/businesses/create')
  }

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <div className='nav-bar-main'>
      <div className='nav-bar' style={{
        backgroundColor: isSplash ? 'none' : '#c41200'
      }}>
        <div className='logo-container'
          onClick={() => { history.push('/') }}>
          <img src={Logo} alt='Logo' height={50} width={50} />
          <p className='logo-content'>Cutielp</p>
        </div>
        <div className='search-bar-container'>
          <SearchBar businessesArr={businessesArr} setSearchResults={setSearchResults} setSearchInput={setSearchInput} />
          <ListBusinessPage searchResults={searchResults} setSearchResults={setSearchResults} searchInput={searchInput} setSearchInput={setSearchInput} />
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
              >
                <img className='profile-button' src="https://img.icons8.com/carbon-copy/100/000000/test-account.png" height={30} width={30} />
              </div>
              <div className='dropdown-content'>
                <div className='dropdown-user'>
                  Hello, {currentUser.firstName}!
                </div>
                <div className='dropdown-me'
                  onClick={() => { history.push('/businesses/current') }}>
                  <span>
                    <i className="fa-solid fa-house"
                      style={{ marginRight: '5px' }}>
                    </i>
                  </span>
                  <span>My Business</span>
                </div>
                <div className='dropdown-me'
                  onClick={onLogout}>
                  <span>
                    <i className="fa-solid fa-right-from-bracket"
                      style={{ marginRight: '5px' }}>
                    </i>
                  </span>
                  <span>Log Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default NavBar;
