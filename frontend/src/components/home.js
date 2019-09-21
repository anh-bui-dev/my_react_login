import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './header';
import { SIGN_IN_PATH } from '../constants/constant';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(user) {
            return [
                <Header user={user} />,
                <div className="container"></div>
            ]
        } else {
            return <Redirect to={SIGN_IN_PATH} />
        }
    }
}

export default Home;
