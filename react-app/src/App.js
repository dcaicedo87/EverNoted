import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import NoteInfoSide from './components/noteinfo/NoteInfoSide';
// import NoteInfoPage from './components/noteinfo/NoteInfoPage';
import NoteInfoEdit from './components/noteinfo/NoteInfoEdit';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="main-container">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/notes/:noteId' exact={true} >
            <>
              <NoteInfoSide />
              <NoteInfoEdit />
            </>
          </ProtectedRoute>
          <ProtectedRoute path="/notes" exact={true}>
            <NoteInfoSide />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <h1>SPLASH PAGE (route="/")</h1>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
