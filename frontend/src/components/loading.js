import React, { Component } from 'react';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
        this.handleLoading = this.handleLoading.bind(this);
    }

    handleLoading() {
        this.setState({
            isLoading: !this.state.isLoading
        })
    }

    render() {
        const { isLoading } = this.state;
        return (
            <div>
                {
                    isLoading &&
                    <div className="modal-mask">
                        <div className="loading d-flex justify-content-center">
                            <div className="spinner-grow text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Loading;