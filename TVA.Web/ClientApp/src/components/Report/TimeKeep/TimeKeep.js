import './TimeKeep.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TimeKeep extends Component {
    render() {
        return (
            <div>
                TimeKeep
            </div>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(TimeKeep);