import './User.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Table } from 'reactstrap';

class User extends Component {
    render() {
        return (
            <div className="card">
                    <div className="card-header">
                        <i className="fa fa-align-justify"></i> All of users
                    </div>
                    <div className="card-body">
                        <Table responsive className="position-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 100 }}>#</th>
                                    <th>Full Name</th>
                                    <th>Gender</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Birthday</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                        </Table>
                    </div>
                </div>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(User);