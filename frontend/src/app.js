import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './components/home';
import SignIn from './components/signIn';
import ResetPassword from './components/resetPassword';
import { HOME_PATH, SIGN_IN_PATH, RESET_PASSWORD_PATH } from './constants/constant';

class App extends Component {
  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(user) {
        var currentDate = Date.parse(new Date());
        var expirationDate = Date.parse(user.expiresAt)
        if(currentDate > expirationDate) {
            sessionStorage.removeItem('user');
        }
    }
  }

  componentDidMount() {
    document.title="My React Login - Jimmy Bui";
  }

  render() {
    return (
      <div id="app">
        <Router>
          <Route exact path={HOME_PATH} component={Home} />
          <Route exact path={SIGN_IN_PATH} component={SignIn} />
          <Route exact path={RESET_PASSWORD_PATH} component={ResetPassword} />
        </Router>
      </div>
    )
  }
}

export default App;
