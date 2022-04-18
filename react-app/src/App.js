import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import NoteInfoSide from './components/noteinfo/NoteInfoSide';
import NoteInfoEdit from './components/noteinfo/NoteInfoEdit';
import NotebookIndex from './components/notebookinfo/NotebookIndex';


function App() {
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  // console.log(`APP SESSION USER:`, sessionUser)
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

  //rendering of navbar if there is a user
  function UserNavBar() {
    if (!sessionUser) {
      return null;
    }
    return <NavBar />
  }

  return (
    <>
      <div className={`main-container${!sessionUser ? "-login": ""}`}>
        <BrowserRouter>
          <UserNavBar />
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
            <ProtectedRoute path='/notebooks/:noteId' exact={true} >
              <>
                <NoteInfoSide />
                <NoteInfoEdit />
              </>
            </ProtectedRoute>
            <ProtectedRoute path="/notes" exact={true}>
              <NoteInfoSide />
            </ProtectedRoute>
            <ProtectedRoute path="/notebooks" exact={true}>
              <NotebookIndex />
            </ProtectedRoute>
            <ProtectedRoute path='/' exact={true} >
              <LoginForm />
            </ProtectedRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
