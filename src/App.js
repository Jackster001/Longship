import React, { Component } from 'react';
// import Chat from "./Chat";
import './index.css';
import * as routes from './Routes/routes';
import * as screens from './Screens'
import Navigation from './Components/Navigation' 
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store';
import PrivateRoute from './Routes/PrivateRoute'
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './Action/sessionAction';
import ChatBox from './Components/ChatBox';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router >
            <Navigation/>
            <div className={localStorage.jwtToken ? "rightScreen":""}>
              <Route exact path={routes.SIGNUP} component={screens.Signup}/>
              <Route exact path={routes.LOGIN} component={screens.Login}/>
              <PrivateRoute exact path={routes.HOME} component={screens.Home}/>
              <PrivateRoute exact path={routes.CONNECT} component={screens.Connect}/>  
              <PrivateRoute exact path={routes.SHIPS} component={screens.Ships}/>
              <PrivateRoute exact path={routes.REQUESTS} component={screens.Requests}/>
              <PrivateRoute exact path={routes.CHATROOM} component={screens.Chatroom}/>
              <PrivateRoute exact path={routes.PROFILE} component={screens.Profile}/>
              <ChatBox/>
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;