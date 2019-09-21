import React, { Component } from 'react';
import { HOME_PATH } from '../constants/constant';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut(e) {
        e.preventDefault();
        sessionStorage.removeItem('user');
        window.location = HOME_PATH;
    }

    render() {
        const { user } = this.props;
        return (
            <div className="header">
                <div className="info">
                {
                    user &&
                    <div className="dropdown show">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Welcome, {user.name} &nbsp;
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" href="#" onClick={this.handleSignOut}>Sign out</a>
                        </div>
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default Header;