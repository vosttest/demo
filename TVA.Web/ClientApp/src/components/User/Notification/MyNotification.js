import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './MyNotification.css';
import {
    Card, CardBody, Col, FormGroup, Input, Label, Row, Badge,
    Table, Modal, ModalHeader, ModalBody, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import Loading from '../../shared/Loading';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/User/MyNotification';
import classnames from 'classnames';

class MyNotification extends Component {
    constructor(props) {
        super(props);

        this.test = this.test.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggle_ModalNoti = this.toggle_ModalNoti.bind(this);
        this.toogle_Tab = this.toogle_Tab.bind(this);

        this.state = {
            id: 0,
            modalRead: false,
            activeTab: '1',
            notiType: ''
        }
    }

    openModal(type) {
        this.setState({
            modalRead: true,
            notiType : type
        });
    }

    test(id, type) {
        document.getElementById('Test' + id).style.color = "red";
        this.openModal(type);
    }

    toggle_ModalNoti() {
        this.setState(
            prevState => ({
                modalRead: !prevState.modalRead
            })
        );
    }

    toogle_Tab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }

        if (tab == '2') {
            console.log("xxxxx");
        }
    }

    render() {
        return (
            <section id="my-notification">
                {this.props.isLoading &&
                    <Loading />
                }
                <Card>
                    <CardBody>
                        <Table className="table" responsive>
                            <thead>
                                <tr>
                                    <td style={{ width: 100 }}>#</td>
                                    <td>Subject</td>
                                    <td>Type</td>
                                    <td>Date</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="Test1" onClick={e => this.test(1, 'INFORM_LEAVE')} style={{ color: 'blue' }}>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>Notification of Leave</td>
                                    <td>11-02-2019</td>
                                </tr>
                                <tr id="Test2" onClick={e => this.test(2, 'APPROVE_LEAVE')} style={{ color: 'blue' }}>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>Notification of Leave Approval</td>
                                    <td>11-02-2019</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

                <Modal size="lg" isOpen={this.state.modalRead}>
                    <ModalHeader className="text-center" toggle={this.toggle_ModalNoti}>
                        LEAVE APPLICATION
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>From: </Label>
                            <span className="pd-left"><b>Lê Ngọc Hiếu</b> &lt;hieu@tanvieta.co&gt;</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Type: </Label>
                            {this.state.notiType == "APPROVE_LEAVE" ?
                                <span className="pd-left">Notification of Leave Approval</span> :
                                <span className="pd-left">Notification of Leave</span>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Date: </Label>
                            <span className="pd-left">13-Feb-2019</span>
                        </FormGroup>
                        <hr />
                        <FormGroup className="pd-left-5">
                            <p>Dear Mr.Thanh, </p>
                            <p>I would like to apply for three days leave from Jan 30 to Feb 1 2019. </p>
                            <p>I hope you will approve my leave. </p>
                            <p>Sincerely</p>
                        </FormGroup>
                        <hr />

                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toogle_Tab('1'); }}>
                                    Info
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toogle_Tab('2'); }}>
                                    More
                                 </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <Table className="tableInfo" responsive>
                                            <thead>
                                                <tr>
                                                    <td><b>ID</b></td>
                                                    <td><b>Sent Type</b></td>
                                                    <td><b>Status</b></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Email</td>
                                                    <td><Badge color="success">Sent</Badge></td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Whatsapp</td>
                                                    <td><Badge color="danger">Not Sent</Badge></td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Telegram</td>
                                                    <td><Badge color="success">Sent</Badge></td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>SMS</td>
                                                    <td><Badge color="danger">Not Sent</Badge></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="3">
                                        <Label>Apply for: </Label>
                                    </Col>
                                    <Col sm="9">
                                        <span><b>Lê Ngọc Hiếu</b> &lt;hieu@tanvieta.co&gt;</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="3">
                                        <Label>Date: </Label>
                                    </Col>
                                    <Col sm="9">
                                        <Badge color="primary">13-Feb-2019</Badge> <b>-></b> <Badge color="primary">15-Feb-2019</Badge>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="3">
                                        <Label>Total Working Hour: </Label>
                                    </Col>
                                    <Col sm="9">
                                        <Badge color="danger">8</Badge>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="3">
                                        <Label>Type: </Label>
                                    </Col>
                                    <Col sm="3">
                                        <Label>Annual leave</Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="3">
                                        <Label>Status: </Label>
                                    </Col>
                                    <Col sm="3">
                                        <Badge color="success" pill>Active</Badge>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </ModalBody>
                </Modal>
            </section>
        );
    }
}

export default connect(
    state => state.myNotification,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MyNotification);