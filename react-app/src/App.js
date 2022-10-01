import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import BusinessesList from './components/Businesses/BusinessesList'
import BusinessDetail from './components/Businesses/BusinessDetail';
import SplashPage from './components/Splash/Splash';
import BusinessForm from './components/Businesses/BusinessForm';
import ReviewList from './components/Reviews/ReviewList';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  const HomePage = () => {
    if (!currentUser) {
      return (
        <>
          <SplashPage />
        </>
      )
    }
  }

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <SplashPage />
        </Route>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route exact path='/sign-up'>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route exact path='/businesses/create'>
          <BusinessForm />
        </Route>
        <Route exact path='/businesses/:businessId/edit'>
          <BusinessForm />
        </Route>
        {/* <Route exact path='/businesses/:businessId/reviews'>
          <ReviewList />
        </Route> */}
        <Route exact path='/businesses/:businessId'>
          <BusinessDetail />
        </Route>
        <Route exact path='/businesses'>
          <BusinessesList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
