/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 07/02/2019 23:59
 * Update       : 07/02/2019 23:59
 * Checklist    : 1.0
 * Status       : OK
 */

import './Holidays.css';
import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Holiday/holidays';
import Loading from './../../shared/Loading';
import isEmpty from 'lodash/isEmpty';

import {
    Badge,
    Button,
    Card,
    CardBody,
    Table,
    CardHeader,
    Col, FormGroup, Input, Label, Row, Alert,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { is } from 'date-fns/esm/locale';

class Holidays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddNew: false,
            isSelectedYear: false,
            txtDate: '',
            selTypeOfDay: '',
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
        this.YearChange = this.YearChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.createNewDay = this.createNewDay.bind(this);
        this.saveNewDay = this.saveNewDay.bind(this);
        this.deleteDay = this.deleteDay.bind(this);
    }

    openModal(cDay, mode) {
        //console.log(cDay);
        this.setState({ modalMode: mode });
        if (cDay !== null) {
            this.setModalData(cDay, false);
            var dateStr = this.formatDate1(cDay.day, cDay.month, cDay.year);
            console.log(dateStr);
            this.setState({
                txtDate: dateStr,
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

    checkDate(d, m, y) {
        let now = new Date();
        let cDate = new Date();
        cDate.setDate(d);
        cDate.setMonth(parseInt(m) - 1);
        cDate.setFullYear(y);
        cDate.setHours(0);
        cDate.setMinutes(0);
        if (cDate < now)
            return true;
        else
            return false;
    }

    getDay(d, m, y) {
        let cDate = new Date();
        cDate.setDate(d);
        cDate.setMonth(parseInt(m) - 1);
        cDate.setFullYear(y);
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var n = weekday[cDate.getDay()];
        return n;
    }

    YearChange(event) {
        //console.log(event.target.value);
        let year = event.target.value;
        if (year === "") {
            this.setState({
                isSelectedYear: false
            });
        }
        else {
            this.setState({
                isSelectedYear: true,
                year: year
            });
            this.props.requestDataOfYear(year);
        }
    }

    updateInput(evt) {
        if (evt.target.name === 'txtDate') {
            if (!isEmpty(evt.target.value)) {
                this.setState({ txtDate: evt.target.value });
            }
            else {
                this.setState({ txtDate: '' });
            }
        }
        if (evt.target.name === 'selTypeOfDay')
            this.setState({ selTypeOfDay: evt.target.value });
        if (evt.target.name === 'selTypeOfWork')
            this.setState({ selTypeOfWork: evt.target.value });
        if (evt.target.name === 'txtDesc')
            this.setState({ txtDesc: evt.target.value });
    }

    saveNewDay() {
        let d = new Date();
        if (!isEmpty(this.state.txtDate)) {
            let arr = this.state.txtDate.split('-');
            d.setDate(arr[2]);
            d.setMonth(parseInt(arr[1]) - 1);
            d.setFullYear(arr[0]);
        }
        let nDay = {
            id: this.state.editingDay.id,
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            typeOfDay: this.state.selTypeOfDay + '-' + this.state.selTypeOfWork,
            note: this.state.txtDesc,
            txtDesc: this.state.txtDesc,
            selTypeOfWork: this.state.selTypeOfWork,
            selTypeOfDay: this.state.selTypeOfDay,
            txtDate: d
        };
        let chk = this.validateInput(nDay);
        //console.log(chk);
        this.setState({
            //editingDay: nDay,
            errors: chk
        });

        if (isEmpty(chk.txtDesc) && isEmpty(chk.selTypeOfWork) && isEmpty(chk.selTypeOfDay) && isEmpty(chk.txtDate)) {
            this.props.saveNewDay(nDay);
            //this.updateModalData(this.props.newDay);
        }
    }

    deleteDay(id) {
        console.log(id);
        confirmAlert({
            title: 'Confirm to delete a Holiday with id ['+ id+']',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log('Yes ' + id);
                        this.props.deleteDay(id);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log('No ' + id);
                    }
                }
            ]
        });
    }

    createNewDay() {
        let d = new Date();
        if (!isEmpty(this.state.txtDate)) {
            let arr = this.state.txtDate.split('-');
            d.setDate(arr[2]);
            d.setMonth(parseInt(arr[1]) - 1);
            d.setFullYear(arr[0]);
        }
        let nDay = {
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            typeOfDay: this.state.selTypeOfDay + '-' + this.state.selTypeOfWork,
            note: this.state.txtDesc,
            txtDesc: this.state.txtDesc,
            selTypeOfWork: this.state.selTypeOfWork,
            selTypeOfDay: this.state.selTypeOfDay,
            txtDate: d
        };
        let chk = this.validateInput(nDay);
        //console.log(chk);
        this.setState({
            newDay: nDay,
            errors: chk
        });

        if (isEmpty(chk.txtDesc) && isEmpty(chk.selTypeOfWork) && isEmpty(chk.selTypeOfDay) && isEmpty(chk.txtDate)) {
            this.props.createNewDay(nDay);
            this.updateModalData(this.props.newDay);
        }
        //console.log(this.props);
    }

    validateInput(newDay) {
        //console.log(newDay);
        var res = {};

        if (isEmpty(newDay.txtDesc)) {
            res.txtDesc = 'Please enter holiday \'s decripttion.';
        }
        if (isEmpty(newDay.selTypeOfWork)) {
            res.selTypeOfWork = 'Please select type of work.';
        }
        if (isEmpty(newDay.selTypeOfDay)) {
            res.selTypeOfDay = 'Please select type of day.';
        }
        if (typeof newDay.txtDate.getMonth !== 'function') {
            res.txtDate = 'Please select a valid day.';
        }
        return res;
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            minute = '' + d.getMinutes(),
            second = '' + d.getSeconds();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour.length < 2) hour = '0' + hour;
        if (minute.length < 2) minute = '0' + minute;
        if (second.length < 2) second = '0' + second;

        return [month, day, year].join('/') + ' ' + [hour, minute, second].join(':');
    }

    formatDate1(d, m, y) {
        var date = new Date();
        date.setDate(d);
        date.setMonth(parseInt(m) - 1);
        date.setFullYear(y);
        var month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    setModalData(nDay, refresh) {
        if (refresh) {
            this.setState({
                txtDesc: '',
                selTypeOfDay: '',
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
                    selTypeOfDay: arr[0] === '' ? '' : arr[0] + '-' + arr[1],
                    selTypeOfWork: arr[2],
                });
            }
        }
    }

    updateModalData(nDay) {
        console.log(nDay);
        this.setModalData(nDay, false);
        //console.log(typeof nDay.note);//string
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.newDay !== prevProps.newDay) {
            this.updateModalData(this.props.newDay);
        }
        if (this.props.message !== prevProps.message) {
            //this.fetchModalDataMessage();
        }
    }

    render() {
        const {
            isLoading
        } = this.props;
        //console.log(this.state);
        //console.log(this.props);
        return (
            <section className="animated fadeIn">
                {
                    isLoading &&
                    <Loading />
                }
                <Card>
                    <CardHeader>
                        <strong>Holidays management</strong>
                        <small> (Create new / Edit)</small>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label htmlFor="selYear">Please select year</Label>
                                    <Input type="select" ref={this.input} name="selYear" id="selYear" onChange={this.YearChange}>
                                        <option value="">Please choose a year</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                {!this.state.isSelectedYear ? '' : (
                                    <FormGroup>
                                        <Label >Actions</Label>
                                        <p>
                                            <Button onClick={e => this.openModal(null, 'CREATE')} color="primary" className="btn-facebook btn-brand mr-1 mb-1"><i className="fas fa-plus"></i><span > Add new Holidays</span></Button>
                                        </p>
                                    </FormGroup>
                                )}
                            </Col>
                            <Col md="3">
                                {this.state.isSelectedYear && this.props.error === true && (
                                    <Alert color="danger">
                                        <h4 className="alert-heading">Error !</h4>
                                        <hr />
                                        <p className="pError">
                                            Something went wrong! {this.props.message}
                                        </p>
                                    </Alert>
                                )}
                                {this.state.isSelectedYear && this.props.error === false && this.props.rsp.length === 0 && (
                                    <Alert color="info">
                                        <h4 className="alert-heading">No data !</h4>
                                        <hr />
                                        <p className="pError">
                                            There is no data for year {this.props.year} ! {this.props.message}
                                        </p>
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {!this.state.isSelectedYear ? '' : (
                    <Card style={{marginTop:20}}>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i>  Holidays of year <strong>[{this.props.year}]</strong>
                        </CardHeader>
                        <CardBody>
                            <Table responsive className="holiday-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: 100 }}>#</th>
                                        <th>Holidays</th>
                                        <th>Day of Week</th>
                                        <th>Date</th>
                                        <th>Type of Day</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.error === false && this.props.rsp.map((i,stt) =>
                                            <tr key={i.id}>
                                                <td>{stt+1}</td>
                                                <td>{i.note}</td>
                                                <td>{this.getDay(i.day, i.month, i.year)}</td>
                                                <td><small>{i.day}-{i.month}-{i.year}</small></td>
                                                <td>{i.typeOfDay}</td>
                                                <td>
                                                    {i.status == 1 && (
                                                        <Badge color="success">Active</Badge>
                                                    )}
                                                    {i.status == 0 && (
                                                        <Badge color="danger">Inactive</Badge>
                                                    )}
                                                </td>
                                                <td>
                                                    {this.checkDate(i.day, i.month, i.year) === false && (
                                                        <div>
                                                            <Button color="primary" onClick={e => this.openModal(i, 'SAVE')} ><i className="fas fa-edit"></i></Button>
                                                            <Button color="secondary" onClick={e => this.deleteDay(i.id)}><i className="fas fa-times"></i></Button>
                                                        </div>
                                                    )}
                                                    {this.checkDate(i.day, i.month, i.year) === true && (
                                                        <div>
                                                            <small>Overdue, cannot update!</small>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                )}
                <Modal size="lg" isOpen={this.state.modalAddNew} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle_ModalAddNew}>
                        {this.state.modalMode === 'CREATE' && (
                            <span>Add new Holiday</span>
                        )}
                        {this.state.modalMode === 'SAVE' && (
                            <span>Update Holiday with id #<b>[{this.state.editingDay.id}]</b></span>
                        )}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label htmlFor="txtDate">Date</Label>
                                    <Input value={this.state.txtDate} disabled={this.state.dateUpdate} type="date" id="txtDate" name="txtDate" placeholder="date" onChange={this.updateInput} required />
                                </FormGroup>
                                {!(isEmpty(this.state.errors.txtDate)) && (
                                    <Alert color="warning">
                                        {this.state.errors.txtDate}
                                    </Alert>
                                )}
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label htmlFor="selTypeOfDay">Type of day</Label>
                                    <Input value={this.state.selTypeOfDay} type="select" name="selTypeOfDay" id="selTypeOfDay" onChange={this.updateInput} required >
                                        <option value="" >Please choose Type Of Day</option>
                                        <option value="Holiday-VN">Holiday of Vietnam -  Ngày lễ Việt Nam</option>
                                        <option value="Holiday-SG">Holiday of Singapore - Ngày lễ Singapore</option>
                                    </Input>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.selTypeOfDay)) && (
                                    <Alert color="warning">
                                        {this.state.errors.selTypeOfDay}
                                    </Alert>
                                )}
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label htmlFor="selTypeOfWork">Type of work</Label>
                                    <Input value={this.state.selTypeOfWork} type="select" name="selTypeOfWork" id="selTypeOfWork" onChange={this.updateInput} required>
                                        <option value="">Please choose Type Of Work</option>
                                        <option value="WORK">WORK - Làm theo lịch cty</option>
                                        <option value="OFF">OFF - Nghỉ theo lịch cty</option>
                                    </Input>
                                </FormGroup>
                                {!(isEmpty(this.state.errors.selTypeOfWork)) && (
                                    <Alert color="warning">
                                        {this.state.errors.selTypeOfWork}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <Label htmlFor="txtDesc">Description</Label>
                                    <Input value={this.state.txtDesc} type="text" id="txtDesc" name="txtDesc" placeholder="Enter description of holiday" onChange={this.updateInput} required />
                                </FormGroup>
                                {!(isEmpty(this.state.errors.txtDesc)) && (
                                    <Alert color="warning">
                                        {this.state.errors.txtDesc}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                {this.state.modalMode === 'CREATE' && this.props.message === '' && typeof this.props.newDay.id === 'number' && this.props.newDay.id > 0 && (
                                    <Alert color="success">
                                        New Holiday has been created successfully ! Id is #[{this.props.newDay.id}]
                                    </Alert>
                                )}
                                {this.state.modalMode === 'CREATE' && this.props.message === 'Exists data' && typeof this.props.newDay.id === 'number' && this.props.newDay.id > 0 && (
                                    <Alert color="info">
                                        This Holiday is already existed in database ! Id is #[{this.props.newDay.id}]
                                        <br />
                                        Status:
                                        {this.props.newDay.status === 2 && (
                                            <Badge color="danger">Deleted</Badge>
                                        )}
                                        {this.props.newDay.status === 1 && (
                                            <Badge color="success">Active</Badge>
                                        )}
                                        {this.props.newDay.status === 0 && (
                                            <Badge color="warning">Inactive</Badge>
                                        )}
                                        <br />
                                        Created by : <a>{this.props.newDay.createdBy}</a> , on date {this.formatDate(this.props.newDay.createdOn)}
                                    </Alert>
                                )}
                                {this.state.modalMode === 'SAVE' && this.props.message === '' && typeof this.props.editingDay.id === 'number' && this.props.editingDay.id > 0 && (
                                    <Alert color="success">
                                        This Holiday has been updated successfully ! Id is #[{this.props.editingDay.id}]
                                        <br />
                                        Created by : <a>{this.props.editingDay.createdBy}</a> , on date {this.formatDate(this.props.editingDay.createdOn)}
                                        <br />
                                        Modified by : <a>{this.props.editingDay.modifiedBy}</a> , on date {this.formatDate(this.props.editingDay.modifiedOn)}
                                    </Alert>
                                )}
                                {this.props.error && (
                                    <Alert color="danger">
                                        Something went wrong ! {this.props.message}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.modalMode === 'CREATE' && (
                            <Button color="primary" onClick={this.createNewDay}>Create</Button>
                        )}
                        {this.state.modalMode === 'SAVE' && (
                            <Button color="primary" onClick={this.saveNewDay}>Save</Button>
                        )}
                        <Button color="secondary" onClick={this.toggle_ModalAddNew}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}

export default connect(
    state => state.yearSearch,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Holidays);