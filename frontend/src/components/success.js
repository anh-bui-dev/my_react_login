import React, { Component } from 'react';

class Success extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="alert alert-success alert-dismissible fade show">
                <strong>Success: </strong> { this.props.message }.
            </div>
        )
    }
}

export default Success;