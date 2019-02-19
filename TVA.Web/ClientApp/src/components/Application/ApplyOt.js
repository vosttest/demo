import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ApplyOt extends Component {
    render() {
        return (
            <div>
                ApplyOt
            </div>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(ApplyOt);