import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import evernotedLogo from './img/EvernotedMk2.png'
import './SignUpForm.css'

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

    //error validation
    setErrors([])

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }

    const newErrors = [];

    if (password !== repeatPassword) {
      newErrors.push("Passwords do not match.")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return;
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
    <>
      <div id="bg-login-signup"></div>
      <div className="login-container-signup">
        <div className="logo resize">
          <img className="resize" src={evernotedLogo} alt="logo"></img>
        </div>
        <form className="login-form" onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input className="form-input" id="username"
              type='text'
              name='username'
              placeholder='Username...'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <input className="form-input" id="username"
              type='email'
              name='email'
              placeholder='Email...'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input className="form-input" id="username"
              type='password'
              name='password'
              placeholder='Password...'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input className="form-input" id="username"
              type='password'
              name='repeat_password'
              placeholder='Repeat Password...'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="login-btn-container">
            <button className="form-button" type='submit'>Sign Up</button>
          </div>
          <div className="register-user-link-container">
              <NavLink className="register-user-link" to="/login">
                Already have an account? Sign in here!
              </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
