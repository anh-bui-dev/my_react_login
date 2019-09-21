import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './header';

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
            return <Redirect to='/signIn' />
        }
    }
}

export default Home;
