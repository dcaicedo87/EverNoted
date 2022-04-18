import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import evernotedLogo from './img/EvernotedMk2.png'
import githubLogo from './img/github.png'
import linkedinLogo from './img/linkedin.png'
import './LoginForm.css'

const LoginForm = () => {
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

  const handleSubmitDemo = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@aa.io"
    const demoPassword = "password"
    await dispatch(login(demoEmail, demoPassword)
    )
  };

  const altLogo = 'Evernote Logo'
  const altGithub = 'Github Logo'
  const altLinkedIn = 'LinkedIn Logo'

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/notes' />;
  }

  return (
    <>
        <div id="bg-login"></div>
        <div className="login-container">
          <div className="logo resize">
            <img className="resize" src={evernotedLogo} alt={altLogo}></img>
          </div>
          <form className="login-form" onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              {/* <label htmlFor='email'>Email</label> */}
              <input className="form-input" id="username"
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              {/* <label htmlFor='password'>Password</label> */}
              <input className="form-input"
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className="login-btn-container">
              <button className="form-button" type='submit'>Login</button>
            </div>
          </form>
          <div className="demo-btn-container">
              <button className="form-button" id="demo" onClick={handleSubmitDemo}>Demo</button>
          </div>
          <div className="register-user-link-container">
              <NavLink className="register-user-link" to="/sign-up">
                Don't have an account? Register here!
              </NavLink>
          </div>
        </div>
          <div className="login-footer">
            <div>
              <p className='login-footer-name'>Daniel Caicedo Llano</p>
            </div>
            <div className='login-footer-links'>
              <a href="https://github.com/dcaicedo87">
                <img src={githubLogo} alt={altGithub}></img>
              </a>
              <a href="https://www.linkedin.com/in/daniel-caicedo-5191a254/">
                <img src={linkedinLogo} alt={altLinkedIn}></img>
              </a>
            </div>
          </div>
    </>
  );
};

export default LoginForm;
