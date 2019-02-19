import './Group.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Group/groups';
import isEmpty from 'lodash/isEmpty';
import Pagination from '../../shared/Pagination/Pagination';

import {
    Badge,
    Button,
    Table,
    Col, FormGroup, Input, Label, Row,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddNew: false,
            isSelectedGroup: false,
            nLevel: '',
            initial: '',
            selTypeOfWork: '',
            txtDesc: '',
            errors: {},
            newDay: {},
            editingDay: {},
            modalMode: 'CREATE',
            dateUpdate: false
        };
        this.openModal = this.openModal.bind(this);
        this.toggle_ModalAddNew = this.toggle_ModalAddNew.bind(this);
        this.GroupChange = this.GroupChange.bind(this);
    }

    openModal(cDay, mode) {
        console.log(cDay);
        this.setState({ modalMode: mode });
        if (cDay !== null) {
            this.setModalData(cDay, false);
            var dateStr = this.formatDate1(cDay.day, cDay.month, cDay.year);
            console.log(dateStr);
            this.setState({
                nLevel: dateStr,
                editingDay: cDay,
                dateUpdate: true
            });
        }
        else {
            this.setModalData(null, true);
            this.setState({
                dateUpdate: false
            });
        }
        this.toggle_ModalAddNew();
    }

    toggle_ModalAddNew() {
        this.setState(
            prevState => ({
                modalAddNew: !prevState.modalAddNew
            })
        );
    }

    GroupChange(event) {
        let group = event.target.value;
        if (group === "") {
            this.setState({
                isSelectedGroup: false
            });
        }
        else {
            this.setState({
                isSelectedGroup: true,
                group: group
            });
            this.props.requestDataOfGroup(group);
        }
    }

    setModalData(nDay, refresh) {
        if (refresh) {
            this.setState({
                txtDesc: '',
                initial: '',
                selTypeOfWork: '',
            });
        }
        else {
            if (typeof nDay.note === 'string' && !isEmpty(nDay.note)) {
                this.setState({ txtDesc: nDay.note });
            }
            if (typeof nDay.typeOfDay === 'string' && !isEmpty(nDay.typeOfDay)) {
                let arr = nDay.typeOfDay.split('-');
                if (arr.length < 3) arr = ['', '', ''];
                this.setState({
                    initial: arr[0] === '' ? '' : arr[0] + '-' + arr[1],
                    selTypeOfWork: arr[2],
                });
            }
        }
    }

    validateInput(newG) {
        //console.log(newG);
        var res = {};

        if (isEmpty(newG.nLevel)) {
            res.nLevel = 'Please enter Group \'s level.';
        }
        
        return res;
    }

    render() {
        const {
            isLoading
        } = this.props;
        return (
            <section>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-3">Search Keyword:</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-primary btn-sm">Search</button>
                                <button type="button" className="btn btn-secondary level-info btn-sm" onClick={e => this.openModal(null, 'CREATE')}>New</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <Table responsive className="holiday-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 100 }}>#</th>
                                    <th>Level</th>
                                    <th>Initial</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>TVA</td>
                                    <td>Group TVA</td>
                                    <td>
                                        <Badge color="danger">Inactive</Badge>
                                    </td>
                                    <td>
                                        <div>
                                            <Button color="primary"><i className="fas fa-edit"></i></Button>
                                            <Button color="secondary"><i className="fas fa-times"></i></Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2</td>
                                    <td>CWS</td>
                                    <td>Group CWS</td>
                                    <td>
                                        <Badge color="success">Active</Badge>
                                    </td>
                                    <td>
                                        <div>
                                            <Button color="primary"><i className="fas fa-edit"></i></Button>
                                            <Button color="secondary"><i className="fas fa-times"></i></Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Pagination />
                    </div>
                </div>
                <Modal size="lg" isOpen={this.state.modalAddNew} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle_ModalAddNew}>
                        {this.state.modalMode === 'CREATE' && (
                            <span>Add new Group</span>
                        )}
                        {this.state.modalMode === 'SAVE' && (
                            <span>Update Group with id #<b>[{this.state.editingDay.id}]</b></span>
                        )}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label htmlFor="nLevel">Level</Label>
                                    <Input type="number" id="nLevel" name="nLevel" className="form-control" placeholder="Type Level" onChange={this.updateInput} required />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label htmlFor="initial">Initial</Label>
                                    <Input type="text" />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label htmlFor="selTypeOfWork">Group Parent</Label>
                                    <Input type="select" required>
                                        <option value="">-- Select Group Parent --</option>
                                        <option value="CWS">CWS</option>
                                        <option value="TVA">TVA</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <Label htmlFor="txtDesc">Description</Label>
                                    <Input type="textarea" id="txtDesc" name="txtDesc" placeholder="Enter description of Group" onChange={this.updateInput} required />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.modalMode === 'CREATE' && (
                            <Button color="primary">Create</Button>
                        )}
                        {this.state.modalMode === 'SAVE' && (
                            <Button color="primary">Save</Button>
                        )}
                        <Button color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}

export default connect(
    state => state.groupSearch,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Group);