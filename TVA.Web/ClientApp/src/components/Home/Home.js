import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Home';
import './Home.css';
import PendingItem from '../shared/PendingItem/PendingItem';
import Pagination from '../shared/Pagination/Pagination';
import News from '../shared/News/News';

class Home extends Component {
    componentWillReceiveProps(propsNext) {
    }

    render() {
        const myPending = {
            approvalLatency: {
                title: "Approval Latency",
                items: {
                    employeeId: 'ALT-Michel-20190120-082059125',
                    Reason: 'stuck in traffic jam',
                    Status: 'Pending approval',
                }
            },
            approvalLeave: {
                title: "Approval Leave",
                items: {
                    employeeId: 'ALT-Michel-20190120-082059125',
                    From: '31/01/2016',
                    To: '01/02/2016',
                    Status: 'Pending Approval'
                }
            },
            approvalOT: {
                title: "Approval OT",
                items: {
                    employeeId: 'ALT-Michel-20190120-082059125',
                    From: '31/01/2016',
                    To: '01/02/2016',
                    Status: 'Pending Approval'
                }
            },
        }

        return (
            <section id="home">
                <div className="row">
                    <div className="col-md-6 my-pending">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">My Pending Items</h4>
                                <PendingItem title={myPending.approvalLatency.title} items={myPending.approvalLatency.items} />
                                <PendingItem title={myPending.approvalLeave.title} items={myPending.approvalLeave.items} />
                                <PendingItem title={myPending.approvalOT.title} items={myPending.approvalOT.items} />
                            </div>
                            <Pagination />
                        </div>
                    </div>
                    <div className="col-md-3 news-info">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">New Informations</h4>
                                <News />
                            </div>
                            <Pagination />
                        </div>
                    </div>
                    <div className="col-md-3 announcement">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Announcement</h4>
                                <div><a href="#">News-Thông báo nghỉ lễ tết</a></div>
                                <div><a href="#">News-Thông báo về việc kỷ luật...</a></div>
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 my-pending">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">My Pending Approval Items</h4>
                                <PendingItem title={myPending.approvalLatency.title} items={myPending.approvalLatency.items} />
                                <PendingItem title={myPending.approvalLeave.title} items={myPending.approvalLeave.items} />
                                <PendingItem title={myPending.approvalOT.title} items={myPending.approvalOT.items} />
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(
    state => state.home,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);