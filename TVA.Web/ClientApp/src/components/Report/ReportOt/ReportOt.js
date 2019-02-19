import './ReportOt.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ReportOt extends Component {
    render() {
        return (
            <div>
                ReportOt
            </div>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(ReportOt);