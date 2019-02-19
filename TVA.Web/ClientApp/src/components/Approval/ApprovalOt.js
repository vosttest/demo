import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/User/SignIn';

class ApprovalOt extends Component {
    render() {
        return (
            <div>ApprovalOt</div>
        );
    }
}

export default connect(
    state => state.userSignIn,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ApprovalOt);