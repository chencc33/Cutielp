import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Login from '../Images/Login.jpg'
import TopBar from '../TopBar';

import './LoginSignup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <div className='login-signup-main'>
        <form className='login-signup-form' onSubmit={onSignUp}>
          <div className='form-title'>Sign Up for Cutielp</div>
          <p style={{ fontSize: '10px' }}>Connect with greate businesses</p>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-fields'>
            <label className='form-labels'>User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='form-fields'>
            <label className='form-labels'>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='form-fields'>
            <label className='form-labels'>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='form-fields'>
            <label className='form-labels'>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <button type='submit' className='form-submit-button'>Sign Up</button>
          </div>
        </form>
        <div className='loginSignup-image-container'>
          <img className='loginSignup-image' src={Login} alt='Login Image' />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
