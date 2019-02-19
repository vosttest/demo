import './Position.css';
import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Position/positions';
import Loading from './../../shared/Loading';
import isEmpty from 'lodash/isEmpty';

import {
    Badge,
    Button,
    Table,
    Col, FormGroup, Input, Label, Row,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Alert
} from 'reactstrap';

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddNew: false,
            isSelectedPosition: false,
            txtKeyword: '',
            txtName: '',
            jobLevel: '',
            jobCate: '',
            txtDesc: '',
            txtReq: '',
            departmentId: '',
            salType: '',
            posType: '',
            preLang: '',
            workLocation: '',
            errors: {},
            newPos: {},
            editingPos: {},
            modalMode: 'CREATE',
            dateUpdate: false
        };
        this.openModal = this.openModal.bind(this);
        this.toggle_ModalAddNew = this.toggle_ModalAddNew.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.createNewPosition = this.createNewPosition.bind(this);
        this.saveNewPosition = this.saveNewPosition.bind(this);

    }

    componentDidMount() {
        this.searchPositionByKeyword("");
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.newPos !== prevProps.newPos) {
            this.updateModalData(this.props.newPos);
        }
        if (this.props.message !== prevProps.message) {
            //this.fetchModalDataMessage();
        }
    }

    toggle_ModalAddNew() {
        this.setState(
            prevState => ({
                modalAddNew: !prevState.modalAddNew
            })
        );
    }

    clickNew() {
        var o = [];
        o.push("jobLevel");
        o.push("jobCate");
        o.push("depart");
        o.push("salaryType");
        o.push("positionType");
        o.push("lang");
        o.push("worklocation");

        this.getAllCodeByCodeType(o);
    }

    updateModalData(newPos) {
        //console.log(newPos);
        this.setModalData(newPos, false);
        //console.log(typeof newPos.note);//string
    }

    createNewPosition() {
        let obj = {
            txtName: this.state.txtName,
            jobLevel: this.state.jobLevel,
            jobCate: this.state.jobCate,
            txtDesc: this.state.txtDesc,
            txtReq: this.state.txtReq,
            departmentId: this.state.departmentId,
            salType: this.state.salType,
            posType: this.state.posType,
            preLang: this.state.preLang,
            workLocation: this.state.workLocation
        };
        let check = this.validateInput(obj);
        this.setState({
            newPos: obj,
            errors: check
        });
        if (isEmpty(check.txtName) && isEmpty(check.jobLevel) && isEmpty(check.jobCate) && isEmpty(check.departmentId)
            && isEmpty(check.salType) && isEmpty(check.posType) && isEmpty(check.preLang)) {
            console.log(obj);
            this.props.createNewPosition(obj);
            this.updateModalData(this.props.newPos);
            this.toggle_ModalAddNew();
        }
    }

    saveNewPosition() {
        let input = {
            id: this.state.editingPos.id,
            txtName: this.state.txtName,
            jobLevel: this.state.jobLevel,
            jobCate: this.state.jobCate,
            txtDesc: this.state.txtDesc,
            txtReq: this.state.txtReq,
            departmentId: this.state.departmentId,
            salType: this.state.salType,
            posType: this.state.posType,
            preLang: this.state.preLang,
            workLocation: this.state.workLocation
        }
        let check = this.validateInput(input);
        this.setState({
            //newPos: input,
            errors: check
        });

        if (isEmpty(check.txtName) && isEmpty(check.jobLevel) && isEmpty(check.jobCate) && isEmpty(check.departmentId)
            && isEmpty(check.salType) && isEmpty(check.posType) && isEmpty(check.preLang)) {
            //console.log(input);
            this.props.saveNewPosition(input);
            //this.updateModalData(this.props.newDay);
        }
        this.toggle_ModalAddNew();
    }

    deletePos(id) {
        //console.log(id);
        confirmAlert({
            title: 'Confirm to delete a Position',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log('Yes ' + id);
                        this.props.deletePos(id);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        //console.log('No ' + id);
                    }
                }
            ]
        });
    }

    openModal(cPos, mode) {
        this.clickNew();

        this.setState({ modalMode: mode });
        if (cPos !== null) {
            //console.log('cPos',cPos);
            this.setModalData(cPos, false);
            this.setState({ editingPos: cPos });
        }
        else {
            this.setModalData(null, true);
        }
        this.toggle_ModalAddNew();
    }

    setModalData(newPos, refresh) {
        if (refresh) {
            this.setState({
                txtName: '',
                jobLevel: '',
                jobCate: '',
                txtDesc: '',
                txtReq: '',
                departmentId: '',
                salType: '',
                posType: '',
                preLang: '',
                workLocation: ''
            });
        }
        else {
            if (!isEmpty(newPos.positionName)) {
                this.setState({
                    txtName: newPos.positionName,
                    jobLevel: newPos.jobLevel,
                    jobCate: newPos.jobCategory,
                    txtDesc: newPos.jobDescription,
                    txtReq: newPos.jobRequirement,
                    departmentId: newPos.departmentId,
                    salType: newPos.salaryType,
                    posType: newPos.positionType,
                    preLang: newPos.preferLang,
                    workLocation: newPos.workLocation
                });
            }
        }
    }

    validateInput(newP) {
        //console.log(newP);
        var res = {};

        if (isEmpty(newP.txtName)) {
            res.txtName = 'Please enter Position \'s name.';
        }
        if (isEmpty(newP.jobLevel) || newP.jobLevel[0] === '-') {
            res.jobLevel = 'Please seclect Job Level.';
        }
        if (isEmpty(newP.jobCate) || newP.jobCate[0] === '-') {
            res.jobCate = 'Please seclect Job Category.';
        }
        if (isEmpty(newP.departmentId) || newP.departmentId[0] === '-') {
            res.departmentId = 'Please seclect Department Id.';
        }
        if (isEmpty(newP.salType) || newP.salType[0] === '-') {
            res.salType = 'Please seclect Salary Type.';
        }
        if (isEmpty(newP.posType) || newP.posType[0] === '-') {
            res.posType = 'Please seclect Position Type.';
        }
        if (isEmpty(newP.preLang) || newP.preLang[0] === '-') {
            res.preLang = 'Please seclect Prefer Language.';
        }
        if (isEmpty(newP.workLocation) || newP.workLocation[0] === '-') {
            res.workLocation = 'Please seclect Work Location.';
        }

        return res;
    }

    updateInput(evt) {
        if (evt.target.name === 'txtKeyword') {
            this.setState({ txtKeyword: evt.target.value });
        }
        if (evt.target.name === 'txtName') {
            this.setState({ txtName: evt.target.value });
        }
        if (evt.target.name === 'jobLevel') {
            this.setState({ jobLevel: evt.target.value });
        }
        if (evt.target.name === 'jobCate') {
            this.setState({ jobCate: evt.target.value });
        }
        if (evt.target.name === 'txtDesc') {
            this.setState({ txtDesc: evt.target.value });
        }
        if (evt.target.name === 'txtReq') {
            this.setState({ txtReq: evt.target.value });
        }
        if (evt.target.name === 'departmentId') {
            this.setState({ departmentId: evt.target.value });
        }
        if (evt.target.name === 'salType') {
            this.setState({ salType: evt.target.value });
        }
        if (evt.target.name === 'posType') {
            this.setState({ posType: evt.target.value });
        }
        if (evt.target.name === 'preLang') {
            this.setState({ preLang: evt.target.value });
        }
        if (evt.target.name === 'workLocation') {
            this.setState({ workLocation: evt.target.value });
        }
    }

    searchPositionByKeyword(key) {
        console.log(key);
        this.props.searchPositionByKeyword(key);
    }

    getAllCodeByCodeType(codeType) {
        //this.props.searchPositionByKeyword(key);
        this.props.getAllCodeByCodeType(codeType);
    }

    render() {
        const {
            isLoading
        } = this.props;
        //console.log(this.props.rspPosition);
        return (
            <section>
                {
                    isLoading &&
                    <Loading />
                }
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-5">Search Keyword:</div>
                            <div className="col-md-3"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-5">
                                <input value={this.state.txtKeyword} type="text" id="txtKeyword" name="txtKeyword" className="form-control" placeholder="Type Keyword" onChange={this.updateInput} />
                            </div>
                            <div className="col-md-3">
                                <button type="button" className="btn btn-primary btn-sm" onClick={e => this.searchPositionByKeyword(this.state.txtKeyword)}>Search</button>
                                <button type="button" className="btn btn-secondary level-info btn-sm" onClick={e => this.openModal(null, 'CREATE')}>New</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-align-justify"></i> All of positions
                    </div>
                    <div className="card-body">
                        <Table responsive className="position-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 100 }}>#</th>
                                    <th>Name</th>
                                    <th>Work Location</th>
                                    <th>Job Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.error === false && this.props.rsp && this.props.rsp.map((i, index) =>
                                        <tr key={i.id}>
                                            <td>{index + 1}</td>
                                            <td>{i.positionName}</td>
                                            <td>{i.workLocation}</td>
                                            <td>{i.jobDescription}</td>
                                            <td>
                                                {i.status == 1 && (
                                                    <Badge color="success">Active</Badge>
                                                )}
                                                {i.status == 0 && (
                                                    <Badge color="danger">Inactive</Badge>
                                                )}
                                            </td>
                                            <td>
                                                <div>
                                                    <Button color="primary" onClick={e => this.openModal(i, 'SAVE')}><i className="fas fa-edit"></i></Button>
                                                    <Button color="secondary" onClick={e => this.deletePos(i.id)}><i className="fas fa-times"></i></Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Modal size="lg" isOpen={this.state.modalAddNew} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle_ModalAddNew}>
                        {this.state.modalMode === 'CREATE' && (
                            <span>Add new Position</span>
                        )}
                        {this.state.modalMode === 'SAVE' && (
                            <span>Update Position</span>
                        )}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="10">
                                <FormGroup>
                                    <Label htmlFor="txtName">Position Name</Label>
                                    <Input value={this.state.txtName} type="text" id="txtName" name="txtName" className="form-control" placeholder="Type Position Name" onChange={this.updateInput} required />
                                </FormGroup>
                                {!(isEmpty(this.state.errors.txtName)) && (
                                    <Alert color="warning">
                                        {this.state.errors.txtName}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="5">
                                <FormGroup>
                                    <Label htmlFor="jobLevel">Job Level</Label>
                                    <select value={this.state.jobLevel} className="form-control" id="jobLevel" name="jobLevel" onChange={this.updateInput} required>
                                        {
                                            this.props.error === false && this.props.rspJobLevel.map(i =>
                                                <option key={i.value} value={i.value}>{i.displayAs}</option>
                                            )
                                        }
                                    </select>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.jobLevel)) && (
                                    <Alert color="warning">
                                        {this.state.errors.jobLevel}
                                    </Alert>
                                )}
                            </Col>
                            <Col md="5">
                                <FormGroup>
                                    <Label htmlFor="jobCate">Job Category</Label>
                                    <select value={this.state.jobCate} className="form-control" id="jobCate" name="jobCate" onChange={this.updateInput} required>
                                        {
                                            this.props.error === false && this.props.rspJobCate.map(i =>
                                                <option key={i.value} value={i.value}>{i.displayAs}</option>
                                            )
                                        }
                                    </select>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.jobCate)) && (
                                    <Alert color="warning">
                                        {this.state.errors.jobCate}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="10">
                                <FormGroup>
                                    <Label htmlFor="txtDesc">Job Description</Label>
                                    <Input type="text" value={this.state.txtDesc} id="txtDesc" name="txtDesc" placeholder="Enter job description of Positon" onChange={this.updateInput} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="10">
                                <FormGroup>
                                    <Label htmlFor="txtReq">Job Requirement</Label>
                                    <Input type="text" value={this.state.txtReq} id="txtReq" name="txtReq" placeholder="Enter Job Requirement of Positon" onChange={this.updateInput} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="5">
                                <FormGroup>
                                    <Label htmlFor="departmentId">DepartmentId</Label>
                                    <select value={this.state.departmentId} className="form-control" id="departmentId" name="departmentId" onChange={this.updateInput} required>
                                        {
                                            this.props.error === false && this.props.rspDepart.map(i =>
                                                <option key={i.value} value={i.value}>{i.displayAs}</option>
                                            )
                                        }
                                    </select>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.departmentId)) && (
                                    <Alert color="warning">
                                        {this.state.errors.departmentId}
                                    </Alert>
                                )}
                            </Col>
                            <Col md="5">
                                <FormGroup>
                                    <Label htmlFor="salType">Salary Type</Label>
                                    <select value={this.state.salType} className="form-control" id="salType" name="salType" onChange={this.updateInput} required>
                                        {
                                            this.props.error === false && this.props.rspSalType.map(i =>
                                                <option key={i.value} value={i.value}>{i.displayAs}</option>
                                            )
                                        }
                                    </select>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.salType)) && (
                                    <Alert color="warning">
                                        {this.state.errors.salType}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="5">
                                <FormGroup>
                                    <Label htmlFor="posType">Position Type</Label>
                                    <select value={this.state.posType} className="form-control" id="posType" name="posType" onChange={this.updateInput} required>
                                        {
                                            this.props.error === false && this.props.rspPosType.map(i =>
                                                <option key={i.value} value={i.value}>{i.displayAs}</option>
                                            )
                                        }
                                    </select>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.posType)) && (
                                    <Alert color="warning">
                                        {this.state.errors.posType}
                                    </Alert>
                                )}
                            </Col>
                            <Col md="5">
                                <FormGroup>
                                    <Label htmlFor="preLang">Prefer Language</Label>
                                    <select value={this.state.preLang} className="form-control" id="preLang" name="preLang" onChange={this.updateInput} required>
                                        {
                                            this.props.error === false && this.props.rspPrefLanguage.map(i =>
                                                <option key={i.value} value={i.value}>{i.displayAs}</option>
                                            )
                                        }
                                    </select>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.preLang)) && (
                                    <Alert color="warning">
                                        {this.state.errors.preLang}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="10">
                                <FormGroup>
                                    <Label htmlFor="txtWL">Work Location</Label>
                                    <select value={this.state.workLocation} className="form-control" id="workLocation" name="workLocation" onChange={this.updateInput} required>
                                        {
                                            this.props.error === false && this.props.rspWorkLocation.map(i =>
                                                <option key={i.value} value={i.value}>{i.displayAs}</option>
                                            )
                                        }
                                    </select>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.workLocation)) && (
                                    <Alert color="warning">
                                        {this.state.errors.workLocation}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.modalMode === 'CREATE' && (
                            <Button color="primary" onClick={this.createNewPosition}>Create</Button>
                        )}
                        {this.state.modalMode === 'SAVE' && (
                            <Button color="primary" onClick={this.saveNewPosition}>Save</Button>
                        )}
                        <Button color="secondary" onClick={this.toggle_ModalAddNew}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}

export default connect(
    state => state.positionSearch,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Position);