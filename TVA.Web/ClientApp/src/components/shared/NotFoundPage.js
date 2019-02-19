import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class NotFoundPage extends Component {
    render() {
        return (
            <div className="wapper">
                <div className="box">
                    <h1>404!</h1>
                    <p>Oops! Sorry, we could not find the page</p>
                    <Link to="/" className="btn btn-info btn-sm">GO BACK HOME</Link>
                </div>
            </div>
        );
    }
}

export default connect()(NotFoundPage);