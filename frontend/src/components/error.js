import React, { Component } from 'react';

class Error extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="alert alert-danger alert-dismissible fade show">
                <strong>Error: </strong> { this.props.message }.
            </div>
        )
    }
}

export default Error;