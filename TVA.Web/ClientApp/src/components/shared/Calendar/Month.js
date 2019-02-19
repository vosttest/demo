import React, { Component } from 'react';
import shortid from 'shortid';
import moment from 'moment';
import './Calendar.css';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
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
import isEmpty from 'lodash/isEmpty';

class Month extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            dateContext: moment(this.props.date),

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

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => this.state.dateContext.format("Y");
    month = () => this.state.dateContext.format("MMMM");
    daysInMonth = () => this.state.dateContext.daysInMonth();
    currentDate = () => this.state.dateContext.get("date");
    currentDay = () => this.state.dateContext.format("D");

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
    }

    render() {
        const { data } = this.props;

        let weekdays = this.weekdaysShort.map((day) => (
            <td key={day} className="week">{day}</td>
        ));

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td key={shortid.generate()} className="day">
                    {""}
                </td>
            )
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let day = this.state.dateContext.date(d).weekday();

            let className = (day == 0 || day == 6) ? " day ignore-day" : " day"; // 0 sun, 6 sat

            let html = "";
            let tooltip = [];

            data && data.map((item) => {
                let day = moment(item.date).format("DD");
                if (day == d && item.type == "approval-leave") {
                    className += " tick approval-leave";
                    tooltip.push({ title: "Approval leave", icon: <i className="fas fa-calendar-check"></i> });
                }
                else if (day == d && item.type == "unaccepted-leave") {
                    className += " tick unaccepted-leave";
                    tooltip.push({ title: "Unaccepted leave", icon: <i className="fas fa-calendar-times"></i> });
                }
                else if (day == d && item.type == "working-half") {
                    className += " tick working-half";
                    tooltip.push({ title: "Working half", icon: <i className="fas fa-calendar-times"></i> });
                }
                if (day == d && item.type == "over-time") {
                    className += " tick over-time-line";
                    tooltip.push({ title: "Over time", icon: <i className="far fa-calendar"></i> });
                }
            });

            if (tooltip.length > 0)
                html = (
                    tooltip.map((t) =>
                        <div key={shortid.generate()} className="ztooltip">
                            {t.icon} {t.title}
                        </div>
                    )
                );

            daysInMonth.push(
                <td key={shortid.generate()} className={className}>
                    {tooltip.length > 0 ?
                        <Tooltip followCursor="true" position="bottom" html={html}>
                            <div onClick={e => this.openModal(null, 'CREATE')}>{d}</div>
                        </Tooltip>
                        :
                        <div>{d}</div>
                    }
                </td >
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            }
            else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d) => (
            <tr key={shortid.generate()}>
                {d}
            </tr>
        ));

        return (
            <div className={this.props.format == "year" ? 'calendar-year' : ''}>
                <h5 className="calendar-month">{this.month()} {this.props.format == "month" && this.year()}</h5>
                <table>
                    <thead className="calendar-header">
                        <tr>
                            {weekdays}
                        </tr>
                    </thead>
                    <tbody>
                        {trElems}
                    </tbody>
                </table>

                <Modal size="lg" isOpen={this.state.modalAddNew} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle_ModalAddNew}>
                            <span>Leave info</span>
                    </ModalHeader>
                    <ModalBody>
                       
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
            </div>
        );
    }

}

export default Month;