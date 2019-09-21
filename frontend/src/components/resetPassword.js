import React, { Component } from 'react';
import Error from './error';
import Popup from './popup';
import Loading from './loading';
import axios from 'axios';
import { Link } from "react-router-dom";
import { URL } from '../constants/constant';
import { validEmail } from '../js/utils.js'

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            email: "",
            newPass: "",
            cfPass: "",
            error: null
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({
            submitted: true
        })

        // Check empty input
        if(this.state.email && this.state.newPass && this.state.cfPass) {
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
                    // Get the list of users
                    const list = resp.data;
                    // Find the user with email
                    const user = list.find(x => x.email == this.state.email);
                    // Check the user exist
                    if(user != null) {
                      // Check the confirm password and new password must be the same
                      if(this.state.cfPass == this.state.newPass) {
                        // Set new password
                        user.password = this.state.cfPass;
                        // Change password
                        axios.put(URL + '/users/' + user.id, user)
                        .then(resp => {
                            this.setState({
                                user : user,
                                error : null,
                                email : "",
                                newPass : "",
                                cfPass : "",
                                submitted : false
                            });

                            // Hide loading
                            this.refs.loading.handleLoading();
                            // Open message box
                            this.refs.popup.handlePopup();

                            // Redirect to sign in page
                            setTimeout(() => {
                                this.refs.popup.handlePopup();
                                window.location = "/signIn";
                            }, 3000);
                        }).catch(error => {
                            // Catch error here
                            this.setState({
                                error : error
                            });
                            // Hide loading
                            this.refs.loading.handleLoading();
                        });
                      } else {
                        this.setState({
                            error : {...{message: "Confirm password is incorrect"}}
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
                    this.error = error;
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
            case 'newPass': this.setState({
                newPass: e.target.value
            });
            break;
            case 'cfPass': this.setState({
                cfPass: e.target.value
            });
            break;
            default: break;
        }
    }

    render() {
        const { submitted, email, newPass, cfPass, error } = this.state;
        return (
            <div className="container">
                <div className="login">
                    <h2>Reset Password</h2>
                    <br/>
                    <form onSubmit={this.handleLogin}>
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
                            <label htmlFor="newPass">New password:</label>
                            <input id="newPass" value={newPass} type="password" onChange={this.handleChange} placeholder="New Password" className={(submitted && !newPass) ? "form-control is-invalid" : "form-control"} />
                            <div className="alert-field">
                                {
                                    (submitted && !newPass) && <div className="invalid-feedback">New password is required</div>
                                }
                            </div>
                        </div>
                        <div className="div-responsive">
                            <label htmlFor="cfPass">Confirm password:</label>
                            <input id="cfPass" value={cfPass} type="password" onChange={this.handleChange} placeholder="Confirm Password" className={(submitted && !cfPass) ? "form-control is-invalid" : "form-control"} />
                            <div className="alert-field">
                                {
                                    (submitted && !cfPass) && <div className="invalid-feedback">Confirm password is required</div>
                                }
                            </div>
                        </div>
                        <div className="div-responsive">
                            <Link to="/signIn" className="customLink">Sign In</Link>
                        </div>
                        <div className="alert-box div-responsive">
                            {
                                (error != null && error.message != null) && <Error message={error.message} />
                            }
                        </div>
                        <div className="div-responsive">
                            <button type="submit" className="btn btn-secondary btn-big">Save</button>
                        </div>
                    </form>
                </div>
                <Popup ref="popup" message="Your password is reset" redirect="/signIn" />
                <Loading ref="loading" />
            </div>
        )
    }
}

export default ResetPassword;