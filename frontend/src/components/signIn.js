import React, { Component } from 'react';
import Error from './error';
import Popup from './popup';
import Loading from './loading';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";
import { URL, HOME_PATH, RESET_PASSWORD_PATH } from '../constants/constant';
import { validEmail } from '../js/utils.js'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            email: "",
            password: "",
            error: null
        }
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSignIn(e) {
        e.preventDefault();
        this.setState({
            submitted: true
        })

        // Check empty input
        if(this.state.email && this.state.password) {
            // Check validation of the email
            if(!validEmail(this.state.email)) {
                this.setState({
                    error : {...{message: "Email is invalid"}}
                });
                return false;
            }

            this.refs.loading.handleLoading();
            // Assume the request will be a half of second
            setTimeout(() => {
                // Get the list of user
                axios.get(URL + '/users')
                .then(resp => {
                    const list = resp.data;
                    // Find the user with email
                    const user = list.find(x => x.email == this.state.email);
                    // Check the user exist
                    if(user != null) {
                        // Check the password
                        if(user.password == this.state.password) {
                            this.setState({
                                error : null,
                                email : "",
                                password : "",
                                submitted : false
                            });

                            // Session storage user
                            const expiresAt = moment(new Date()).add(30, 'm').toDate();
                            user.expiresAt = expiresAt;
                            sessionStorage.setItem('user', JSON.stringify(user));

                            // Hide loading
                            this.refs.loading.handleLoading();
                            // Open message box
                            this.refs.popup.handlePopup();

                            // Redirect to home page
                            setTimeout(() => {
                                this.refs.popup.handlePopup();
                                window.location = HOME_PATH;
                            }, 3000);
                        } else {
                            this.setState({
                                error : {...{message: "Password is incorrect"}}
                            });
                            // Hide loading
                            this.refs.loading.handleLoading();
                        }
                    } else {
                        this.setState({
                            error : {...{message: "Email doesn't exist"}}
                        });
                        // Hide loading
                        this.refs.loading.handleLoading();
                    }
                }).catch(error => {
                    // Catch error here
                    this.setState({
                        error : error
                    });
                    // Hide loading
                    this.refs.loading.handleLoading();
                });
            }, 500);
        }
    }

    handleChange(e) {
        switch(e.target.id) {
            case 'email': this.setState({
                email: e.target.value
            });
            break;
            case 'password': this.setState({
                password: e.target.value
            });
            break;
            default: break;
        }
    }

    render() {
        const { submitted, email, password, error } = this.state;
        return (
            <div className="container">
                <div className="login">
                    <h2>Sign In</h2>
                    <br/>
                    <form onSubmit={this.handleSignIn}>
                        <div className="div-responsive">
                            <label htmlFor="email">Email:</label>
                            <input id="email" value={email} type="text" onChange={this.handleChange} placeholder="Email" className={(submitted && !email) ? "form-control is-invalid" : "form-control"} />
                            <div className="alert-field">
                                {
                                    (submitted && !email) && <div className="invalid-feedback">Email is required</div>
                                }
                            </div>
                        </div>
                        <div className="div-responsive">
                            <label htmlFor="password">Password:</label>
                            <input id="password" value={password} type="password" onChange={this.handleChange} placeholder="Password" className={(submitted && !password) ? "form-control is-invalid" : "form-control"} />
                            <div className="alert-field">
                                {
                                    (submitted && !password) && <div className="invalid-feedback">Password is required</div>
                                }
                            </div>
                        </div>
                        <div className="div-responsive">
                            <Link to={RESET_PASSWORD_PATH} className="customLink">Want to reset password ?</Link>
                        </div>
                        <div className="alert-box div-responsive">
                            {
                                (error != null && error.message != null) && <Error message={error.message} />
                            }
                        </div>
                        <div className="div-responsive btn-center">
                            <button type="submit" className="btn btn-secondary btn-big">Sign In</button>
                        </div>
                    </form>
                </div>
                <Popup ref="popup" message="Logged In" redirect={HOME_PATH} />
                <Loading ref="loading" />
            </div>
        )
    }
}

export default SignIn;