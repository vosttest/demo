import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ApprovalLate extends Component {
    render() {
        return (
            <div>
                ApprovalLate
            </div>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(ApprovalLate);