import './Leave.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LeaveBalance extends Component {
    render() {
        return (
            <div>
                LeaveBalance
            </div>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(LeaveBalance);