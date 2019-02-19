import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import './LeaveInfo.Card.css';
import {
    Card, CardBody, CardHeader, Collapse
} from 'reactstrap';

export default class LeaveInfoCard extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            collapse: this.props.defaultCollapse || false
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <Card className="card card-leave-info">
                <CardHeader>
                    <div className="row" onClick={this.toggle}>
                        <div className="col-md-3">
                            <span className="card-field">
                                User:
                                </span>
                            {this.props.data && this.props.data.fullName}
                        </div>
                        <div className="col-md-2">
                            <span className="card-field">
                                Approval Leave:
                                </span>
                            <div className="tick-annotate approval-leave">2h</div>
                        </div>
                        <div className="col-md-2">
                            <span className="card-field">
                                Unaccepted Leave:
                                </span>
                            <div className="tick-annotate unaccepted-leave">2h</div>
                        </div>
                        <div className="col-md-2">
                            <span className="card-field">
                                Over Time:
                                </span>
                            <div className="tick-annotate over-time-line">2h</div>
                        </div>
                        <div className="col-md-3">
                            <div className="card-header-actions">
                                {this.state.collapse && (
                                    <a className="card-header-action btn btn-minimize" data-target="#collapseExample"><i className="fas fa-angle-up"></i></a>
                                )}
                                {!this.state.collapse && (
                                    <a className="card-header-action btn btn-maximize" data-target="#collapseExample"><i className="fas fa-angle-down"></i></a>
                                )}
                            </div>
                        </div>
                    </div>

                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                    <CardBody>
                        <Calendar format={this.props.format} date={this.props.date} data={this.props.data.leaveDays} />
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}