import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import TopBar from '../TopBar'
import Login from '../Images/Login.jpg'
import './Login.css'

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
    history.push('/businesses')
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

  return (
    <>
      <TopBar />
      <div className='login-main'>
        <form className='login-form' onSubmit={onLogin}>
          <div className='login-title'>Log in to Cutielp</div>
          <p style={{ fontSize: '10px' }}>New to Cutielp? Sign up</p>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='loginFields'>
            <label className='loginLabels' htmlFor='email'>Email</label>
            <div className='loginInputContainers'>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
          </div>
          <div className='loginFields'>
            <label className='loginLabels' htmlFor='password'>Password</label>
            <div className='loginInputContainers'>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button type='submit' className='loginButton'>Login</button>
          </div>
        </form>
        <div className='login-image-container'>
          <img className='login-image' src={Login} alt='Login Image' />
        </div>
      </div>
    </>

  );
};

export default LoginForm;
