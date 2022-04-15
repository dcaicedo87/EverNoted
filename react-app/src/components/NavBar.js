
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createNoteThunk } from '../store/note';
import LogoutButton from './auth/LogoutButton';
import"./NavBar.css";

const NavBar = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const handleNewNote = async e => {
    if (!sessionUser.id) return;

    const note = await (dispatch(createNoteThunk(sessionUser.id)))

    history.push('/notes')
  }

  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar-username-container">
          <h1>{sessionUser?.username}</h1>
        </div>
        <div className="navbar-add-button-container">
          <button className="navbar-add-button" onClick={handleNewNote}>ADD NOTE</button>
        </div>
        <ul className='navbar-list-container'>
          <li>
            <NavLink className="nav-bar-links" to='/notes' exact={true} activeClassName='active'>
              All Notes
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-bar-links" to='/notebooks' exact={true} activeClassName='active'>
              Notebooks
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-bar-links" to='/tags' exact={true} activeClassName='active'>
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
