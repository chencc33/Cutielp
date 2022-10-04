import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Login from '../Images/Login.jpg'
import TopBar from '../TopBar';

import './LoginSignup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let errs = []
    if (firstName.length > 15) { errs.push('error: First name less than 15 characters.') }
    if (lastName.length > 15) { errs.push('error: Last name less than 15 characters.') }
    if (!email.includes('@')) { errs.push('error: Invalid email address.') }
    if (password.length < 6) { errs.push('error: Password at least 6 characters.') }
    setErrors(errs)
  }, [firstName, lastName, email, password])

  const onSignUp = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)

    if (password === repeatPassword && !errors.length) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
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

  function passwordCheck() {
    if (password !== repeatPassword) {
      return (
        <div className='errorText'>
          Passwords must match
        </div>
      )
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <div className='login-signup-main'>
        <form className='login-signup-form' onSubmit={onSignUp}>
          <div className='form-title'>Sign Up for Cutielp</div>
          <p style={{ fontSize: '13px' }}>Connect with greate businesses</p>
          <div>
            {hasSubmitted && errors.length > 0 && (<div className='errorContainer'>
              {errors.map((error, ind) => (
                <div key={ind} className='errorText'>{error.split(":")[1]}</div>
              ))}
            </div>)}
            {
              passwordCheck()
            }
          </div>
          <div className='form-fields'>
            <label className='form-labels'>First Name*</label>
            <input
              type='text'
              name='firtname'
              onChange={updateFirstName}
              value={firstName}
              required
            ></input>
          </div>
          <div className='form-fields'>
            <label className='form-labels'>Last Name*</label>
            <input
              type='text'
              name='lastname'
              onChange={updateLastName}
              value={lastName}
              required
            ></input>
          </div>
          <div className='form-fields'>
            <label className='form-labels'>Email*</label>
            <input
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
            ></input>
          </div>
          <div className='form-fields'>
            <label className='form-labels'>Password*</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className='form-fields'>
            <label className='form-labels'>Repeat Password*</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <button type='submit' className='form-submit-button'>Sign Up</button>
          </div>
          <div>
            <p style={{ fontSize: '13px' }}>Already sign up?
              <NavLink to={`/login`}> Login</NavLink>
            </p>
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
