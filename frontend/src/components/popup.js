import React, { Component } from 'react';
import Success from './success'

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false
        }
        this.handlePopup = this.handlePopup.bind(this);
    }

    handlePopup(e) {
        this.setState({
            openPopup: !this.state.openPopup
        })
        if(e && e.target && this.props.redirect) {
            window.location = this.props.redirect;
        }
    }

    render() {
        const { openPopup } = this.state;
        return (
            <div>
                {
                    openPopup &&
                    <div className="modal modal-mask">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header div-responsive">
                                    <div className="modal-title"><h4>Message Box</h4></div>
                                    <button type="button" className="close" onClick={this.handlePopup} data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body div-responsive">
                                    <Success message={this.props.message} />
                                </div>
                                <div className="modal-footer div-responsive">
                                    <button type="button" className="btn btn-secondary" onClick={this.handlePopup}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Popup;