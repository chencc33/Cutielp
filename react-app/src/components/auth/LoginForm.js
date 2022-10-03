import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import TopBar from '../TopBar'
import Login from '../Images/Login.jpg'
import './LoginSignup.css'

const LoginForm = () => {
  const history = useHistory()

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemoClick = (e) => {
    e.preventDefault()
    let demoEmail = "demo@user.io"
    let demoPassword = "password"

    return dispatch(login(demoEmail, demoPassword)).catch(
      async (res) => {
        const data = await res.json()
        if (data) {
          setErrors(data)
        }
      }
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <div className='login-signup-main'>
        <form className='login-signup-form' onSubmit={onLogin}>
          <div className='form-title'>Log in to Cutielp</div>
          <p style={{ fontSize: '13px' }}>New to Cutielp? {
            <NavLink to={`/sign-up`}>Sign up</NavLink>
          }</p>
          <div>
            {errors.length > 0 && (<div className='errorContainer project-errors'>
              {errors.map((error, ind) => (
                <div key={ind} className='errorText'>{error.split(":")[1]}</div>
              ))}
            </div>)}
          </div>
          <div className='form-fields'>
            <label className='form-labels' htmlFor='email'>Email</label>
            <input className='form-inputs'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form-fields'>
            <label className='form-labels' htmlFor='password'>Password</label>
            <input className='form-inputs'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit' className='form-submit-button'>Login</button>
            <button type='button' className='form-submit-button' onClick={handleDemoClick}>Sign in as Demo user</button>
          </div>
        </form>
        <div className='loginSignup-image-container'>
          <img className='loginSignup-image' src={Login} alt='Login Image' />
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
