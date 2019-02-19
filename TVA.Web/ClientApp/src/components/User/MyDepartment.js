import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-table/react-table.css'
import Pagination from '../shared/Pagination/Pagination';
import './User.css';

import {
    FormGroup, Label, Modal, ModalHeader, ModalBody
} from 'reactstrap';
class MyDepartment extends Component {
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.toggle_ModalNoti = this.toggle_ModalNoti.bind(this);
        this.state = {
            modalRead: false
        }
    }

    openModal() {
        this.setState({
            modalRead: true
        });
    }

    toggle_ModalNoti() {
        this.setState(
            prevState => ({
                modalRead: !prevState.modalRead
            })
        );
    }

    render() {
        return (
            <section>
                <div className="card">
                    <div className="card-header">
                        Department Infomation
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <span className="card-field">
                                    Username
                                </span>
                                Michel <small>(michel.thanh@tanvieta.co)</small>
                            </div>
                            <div className="col-md-3">
                                <span className="card-field">
                                    Full name
                                </span>
                                Thân Minh Thành
                            </div>
                            <div className="col-md-3">
                                <span className="card-field">
                                    Department
                                </span>
                                CWS - Crimsonworks
                            </div>
                            <div className="col-md-3">
                                <span className="card-field">
                                    Position
                                </span>
                                Function Lead
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Department Members
                    </div>
                    <div className="card-body">
                        <input type="text" id="search" placeholder="Search..." title="Type in a name"></input>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ALE Reference No.</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Leave From</th>
                                    <th scope="col">Leave To</th>
                                    <th scope="col">Total Day</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="Test1" onClick={e => this.openModal()}>
                                    <td>ALE-Michel-20190119-000001</td>
                                    <td>Michel</td>
                                    <td>25-01-2019</td>
                                    <td>31-01-2019</td>
                                    <td>5</td>
                                    <td>Pending Approval</td>
                                </tr>
                                <tr id="Test1" onClick={e => this.openModal()}>
                                    <td>ALE-Michel-20190121-000001</td>
                                    <td>Michel</td>
                                    <td>25-01-2019</td>
                                    <td>26-01-2019</td>
                                    <td>5</td>
                                    <td>Draft</td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination />
                        <br />
                    </div>
                </div>
                <Modal size="lg" isOpen={this.state.modalRead}>
                    <ModalHeader className="text-center" toggle={this.toggle_ModalNoti}>
                        USER DETAIL
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>ALE Reference No.: </Label>
                            <span className="pd-left"><b>ALE-Michel-20190119-000001</b></span>
                        </FormGroup>
                        <FormGroup>
                            <Label>	User Name: Michel</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Leave From: </Label>
                            <span className="pd-left">13-Feb-2019</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Leave To: </Label>
                            <span className="pd-left">13-Feb-2019</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Total Day: </Label>
                            <span className="pd-left">13-Feb-2019</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Status: </Label>
                            <span className="pd-left">13-Feb-2019</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Created Time: </Label>
                            <span className="pd-left">13-Feb-2019</span>
                        </FormGroup>
                    </ModalBody>
                </Modal>
            </section>
        );
    }
}
export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(MyDepartment);