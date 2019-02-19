import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Leave.css';
import DatePicker from 'react-datepicker';

class ApprovalLeaveDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: new Date()
        }
    }

    onChange() {
    }

    render() {
        return (
            <section>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-2">User Name</div>

                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <p>Michel</p>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">ALE Reference No.</div>
                            <div className="col-md-2">Total Approved Leaves</div>
                            <div className="col-md-2">Status</div>
                            <div className="col-md-2">Curently Approver</div>
                            <div className="col-md-4"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-2">
                                <p>ALE_Michel_1212333</p>
                            </div>
                            <div className="col-md-2">
                                <p>5</p>
                            </div>
                            <div className="col-md-2">
                                <p>Pending Approval</p>
                            </div>
                            <div className="col-md-2">
                                <p>Mintat</p>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-primary btn-sm">Submit</button>
                                    </div>
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-secondary btn-sm">Approve</button>
                                    </div>
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-success btn-sm">Cancel</button>
                                    </div>
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-danger btn-sm">Reverse</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-5">Approval Leave For:</div>
                                    <div className="col-md-5">
                                        <p>[user name]</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-5">Created by: </div>
                                    <div className="col-md-5">
                                        <p>[System auto populate]</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-5">From:</div>
                                    <div className="col-md-5">
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.from}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-5">From:</div>
                                    <div className="col-md-5">
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.from}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-5">Total Leave Day</div>
                                    <div className="col-md-5">
                                        <p>[Text-fomurla]</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-5">
                                        <input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} /> 1/2 day
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">Reason for Approval Leave:</div>
                            <div className="col-md-12">
                                <textarea value={this.state.value} onChange={this.handleChange} cols={150} rows={5} />
                            </div>
                        </div>

                        <div className="row">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Team Maneger</th>
                                        <th scope="col">Supervisor</th>
                                        <th scope="col">HR</th>
                                        <th scope="col">Director Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Approved</td>
                                        <td>Pending Approval</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Hieu</td>
                                        <td>Mintat</td>
                                        <td>Phoebe</td>
                                        <td>Joe</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
        );
    }
}

export default connect()(ApprovalLeaveDetail);