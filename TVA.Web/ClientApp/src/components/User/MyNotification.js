import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyNotification extends Component {
    render() {
        return (
            <div>
                MyNotification
            </div>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(MyNotification);