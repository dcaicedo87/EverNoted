
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import"./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id;

  return (
    <div>
      <nav className="navbar-container">
        <div>
          <h1>{sessionUser.username}</h1>
        </div>
        <div>
          <button>ADD NOTE</button>
        </div>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/notes' exact={true} activeClassName='active'>
              All Notes
            </NavLink>
          </li>
          <NavLink to='/notebooks' exact={true} activeClassName='active'>
            Notebooks
          </NavLink>
          <li>
            <NavLink to='/tags' exact={true} activeClassName='active'>
              Tags
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
