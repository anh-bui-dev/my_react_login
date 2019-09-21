import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import moment from 'moment';
import Home from './components/home';
import SignIn from './components/signIn';
import ResetPassword from './components/resetPassword';

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
          <Route exact path="/" component={Home} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/resetPassword" component={ResetPassword} />
        </Router>
      </div>
    )
  }
}

export default App;
