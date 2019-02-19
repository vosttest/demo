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

import './Leave.css';
import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Leave/applyLeave';

import { Pie } from 'react-chartjs-2';
import { 
    Badge, Card, CardBody, CardHeader, Row, Collapse, Fade,
    Col, FormGroup,Input,Label, Alert, Table, Button,FormText,
    Pagination, PaginationItem, PaginationLink,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

import { Multiselect } from 'react-widgets'

class ApplyLeave extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggleData = this.toggleData.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);

        this.toggleModal = this.toggleModal.bind(this);
        this.createNewApplication = this.createNewApplication.bind(this);
        this.deleteApply = this.deleteApply.bind(this);

        this.YearChange = this.YearChange.bind(this);
        this.queryNext = this.queryNext.bind(this);
        this.queryPrev = this.queryPrev.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.openModal = this.openModal.bind(this);
       
        this.state = {
            collapse: true,
            collapseData:true,
            collapseInfo:true,
            fadeIn: true,
            timeout: 300,
            selYear:'',
            isSelectedYear: false,
            year: '',
            Modal:false,
            modalMode:'CREATE',
            selLeaveType:'',
            isSelectLeaveType:false,
            tTime:'23:59',
            fTime:'00:01',
            tDate:'',
            fDate:'',
            txtTotalHour:1,
            txtReason:'',
            informList:[],
            approveList:[],
            isCreated:false,
            size:5,
            checkForNew:{
                selLeaveType:'',
                tTime:'',
                fTime:'',
                tDate:'',
                fDate:'',
                txtTotalHour:'',
                txtReason:'',
                informList:'',
                approveList:''
            },
            editingLeaveApply:{}
        };
    }

    componentDidMount()
    {
        this.props.loadCode();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.lsStatus !== prevProps.lsStatus) {
            //this.props.loadCode();
        }
    }

    checkWeekDay(date_ck,month_ck,year_ck)
    {
        let Holidays = this.props.lsHolidays;
        let res = true;
        var dt = new Date(year_ck,month_ck,date_ck,0,0);
        if ((dt.getDay()===0)||(dt.getDay()===6)) return false;
        for (var i = 0, len = Holidays.length; i<len; i++)
        {
            var holi = Holidays[i];
            if ((parseInt(holi.day)===date_ck) && (parseInt(holi.month)===(month_ck+1)) 
            && (parseInt(holi.year)===year_ck) && holi.typeOfDay.indexOf("OFF")>0) 
            {
                return false;
            }
        }
        return res;
    }

    calcTotalHour(begin,end)
    {
        let time_from = begin.getHours() * 60 + begin.getMinutes();

        let dividenDay_thisYear = new Date();
        dividenDay_thisYear.setDate(31);
        dividenDay_thisYear.setMonth(2);
        dividenDay_thisYear.setHours(23);
        dividenDay_thisYear.setMinutes(59);
        
        let dividenDay_nextYear = new Date();
        dividenDay_nextYear.setDate(31);
        dividenDay_nextYear.setMonth(2);
        dividenDay_nextYear.setHours(23);
        dividenDay_nextYear.setMinutes(59);
        dividenDay_nextYear.setFullYear(dividenDay_thisYear.getFullYear()+1);
        
        let time_to = end.getHours() * 60 + end.getMinutes();
        let totalHr = 0;
        var d = begin;
        
        while (d<=end)
        {
            var res = this.checkWeekDay(d.getDate(),d.getMonth(),d.getFullYear());
            if ((res))
            {
                for (var h = 480; h<=1080; h = h + 15)
                {
                    if ((d.getDate() === begin.getDate()) &&  (d.getMonth() === begin.getMonth()) &&  (d.getFullYear() === begin.getFullYear()) && h <= time_from) {}
                    else if ((d.getDate() === end.getDate()) &&  (d.getMonth() === end.getMonth()) &&  (d.getFullYear() === end.getFullYear()) && h > time_to) {}
                    else if ( h >= 720 && h <= 840) {}
                    else totalHr += 15;
                }
            }
            d.setDate(d.getDate()+1);
        }
        totalHr = totalHr / 60;
        return totalHr;
    }

    TimeApply()
    {
        let txtTotalHour = "";
        let begin = new Date();
        let arr_df = this.state.fDate.split('-');
        let arr_tf = this.state.fTime.split(':');
        
        begin.setFullYear(arr_df[0]);
        begin.setMonth(parseInt(arr_df[1]) - 1);
        begin.setDate(arr_df[2]);
        begin.setHours(arr_tf[0]);
        begin.setMinutes(arr_tf[1]);
        let time_from = parseInt(arr_tf[0]) * 60 + parseInt(arr_tf[1]);

        let end = new Date();
        let arr_dt = this.state.tDate.split('-');
        let arr_tt = this.state.tTime.split(':');
       
        end.setFullYear(arr_dt[0]);
        end.setMonth(parseInt(arr_dt[1]) - 1);
        end.setDate(arr_dt[2]);
        end.setHours(arr_tt[0]);
        end.setMinutes(arr_tt[1]);

        let dividenDay_thisYear = new Date();
        dividenDay_thisYear.setDate(31);
        dividenDay_thisYear.setHours(23);
        dividenDay_thisYear.setMinutes(59);
        
        let dividenDay_nextYear = new Date();
        dividenDay_nextYear.setMonth(2);
        dividenDay_nextYear.setDate(31);
        dividenDay_nextYear.setHours(23);
        dividenDay_nextYear.setMinutes(59);
        dividenDay_nextYear.setFullYear(dividenDay_thisYear.getFullYear()+1);

        
        
        let time_to = parseInt(arr_tt[0]) * 60 + parseInt(arr_tt[1]);
        let totalHr = 0;
        var d = begin;
        
        while (d<=end)
        {
            var res = this.checkWeekDay(d.getDate(),d.getMonth(),d.getFullYear());
            if ((res))
            {
                for (var h = 480; h<=1080; h = h + 15)
                {
                    if ((d.getDate() === begin.getDate()) &&  (d.getMonth() === begin.getMonth()) &&  (d.getFullYear() === begin.getFullYear()) && h <= time_from) {}
                    else if ((d.getDate() === end.getDate()) &&  (d.getMonth() === end.getMonth()) &&  (d.getFullYear() === end.getFullYear()) && h > time_to) {}
                    else if ( h >= 720 && h <= 840) {}
                    else totalHr += 15;
                }
            }
            d.setDate(d.getDate()+1);
        }
        totalHr = totalHr / 60;
        this.setState({txtTotalHour: totalHr });

        if(begin < dividenDay_thisYear && dividenDay_thisYear < end)
        {
            return "Your leave time cannot include the time point [31-Mar-"+dividenDay_thisYear.getFullYear()+" 23:59] !";
        }
        if(begin < dividenDay_nextYear && dividenDay_nextYear < end)
        {
            return "Your leave time cannot include the time point [31-Mar-"+dividenDay_nextYear.getFullYear()+" 23:59] !";
        }
        
        if( totalHr === 0)
        {
            txtTotalHour ='Total hour cannot equal zero, please check again! '
        }
        if(typeof this.props.leaveBalance !== undefined && this.state.selLeaveType==='1')
        {
            let remainingHour = parseFloat(this.props.leaveBalance.balance)- parseFloat(this.props.leaveBalance.outStanding);
            if(totalHr>remainingHour)
            {
                txtTotalHour =txtTotalHour+'Total hour cannot be greater than remaining amount ('+remainingHour+' hours)!';
            }
        }
        return txtTotalHour;
    }

    checkForNewApplication()
    {
        let selLeaveType ='';
        if(this.state.selLeaveType ==='')
        {
            selLeaveType ='Please select Leave Type';
        }
        
        let tDate ='';
        if(this.state.tDate.trim() ==='')
        {
            tDate ='Please select [To Date]';
        }

        let fDate ='';
        if(this.state.fDate.trim() ==='')
        {
            fDate ='Please select [from Date]';
        }

        let txtTotalHour ="";
        if(this.state.txtTotalHour === 0)
        {
            txtTotalHour ='Please select date range for your leave!'
        }

        if(fDate==='' && tDate==='')
        {
            txtTotalHour = this.TimeApply();
        }
        //console.log(this.state.txtTotalHour);

        let txtReason ='';
        if(this.state.txtReason.trim() === '')
        {
            txtReason ='Please input your reason of leave!'
        }

        let informList ='';
        if(this.state.informList.length === 0)
        {
            informList ='Please select at least one imformee!'
        }

        let approveList ='';
        if(this.state.approveList.length === 0)
        {
            approveList ='Please select at least one approver!'
        }

        let checkForNew ={
            selLeaveType: selLeaveType,
            tDate:tDate,
            fDate:fDate,
            txtTotalHour:txtTotalHour,
            txtReason:txtReason,
            informList:informList,
            approveList:approveList
        }
        this.setState({checkForNew:checkForNew});
        if(selLeaveType==='' && tDate==='' && fDate==='' && txtTotalHour==='' && txtReason==='' && informList==='' && approveList==='')
            return true;
        else
            return false;
    }

    createNewApplication()
    {
        let chk = this.checkForNewApplication();
        if(chk)
        {
            let obj = this.readLeaveApplyOject();
            console.log(obj);
            this.props.createNewLeaveApply(obj);
            this.setState({isCreated:true});
        }
        else
        {
            this.setState({isCreated:false});
        }
    }

    readLeaveApplyOject()
    {
        let begin = new Date();
        let timeZoneOffset = (new Date()).getTimezoneOffset();

        let arr_df = this.state.fDate.split('-');
        let arr_tf = this.state.fTime.split(':');
        begin.setFullYear(parseInt(arr_df[0]));
        begin.setMonth(parseInt(arr_df[1]) - 1);
        begin.setDate(parseInt(arr_df[2]));
        //begin.setUTCHours(arr_tf[0],arr_tf[1],0,0);
        begin.setHours(arr_tf[0]);
        begin.setMinutes(arr_tf[1]);

        let end = new Date();
        let arr_dt = this.state.tDate.split('-');
        let arr_tt = this.state.tTime.split(':');
        end.setFullYear(parseInt(arr_dt[0]));
        end.setMonth(parseInt(arr_dt[1]) - 1);
        end.setDate(parseInt(arr_dt[2]));
        end.setHours(arr_tt[0]);
        //end.setUTCHours(arr_tt[0],arr_tt[1],0,0);
        end.setMinutes(arr_tt[1]);

        console.log(arr_tf);
        console.log(arr_df);
        console.log(arr_tt);
        console.log(arr_dt);

        let obj ={};
        let master = {};
        master.applyFor = this.props.curUser.id;
        master.applyType = this.state.selLeaveType;
        master.fromTime = this.getDateFormat(begin);
        master.toTime = this.getDateFormat(end);
        let totHour = this.calcTotalHour(begin, end);
        master.totalWorkingHour = totHour;
        master.note = this.state.txtReason;
        master.status = 1;
        master.timeZoneOffset = timeZoneOffset;
        let list =[];
        for(var i =0; i<this.state.informList.length; i++)
        {
            var item = {};
            item.applyDetailType = "Inform";
            item.actionBy = this.state.informList[i].id;
            item.status = 1;
            list.push(item);
        }
        for(var i =0; i<this.state.approveList.length; i++)
        {
            var item = {};
            item.applyDetailType = "Approve";
            item.actionBy = this.state.approveList[i].id;
            item.status = 1;
            list.push(item);
        }
        obj.leaveApply = master;
        obj.leaveApplyDetail = list;
        return obj;
    }

    getDateFormat(d)
    {
        let month = '' + (d.getMonth() + 1),
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

        return [year, month, day].join('-') + 'T' + [hour, minute, second].join(':') + '.00';
    }

    deleteApply(id) {
        console.log(id);
        confirmAlert({
            title: 'Confirm to delete a Leave-Application with id['+id+']',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log('Yes ' + id);
                        //this.props.deleteApply(id);
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

    YearChange(event)
    {
        //console.log(event.target.value);
        //console.log(event.target.name);
        //console.log(event.target);
        //console.log(event.target.innerHTML);
        let value = event.target.value;
        let name = event.target.name;
        //let inner = event.target.innerHTML;
        if(name === "selYear")
        {
            if(value === "")
            {
                this.setState({
                    isSelectedYear: false
                });
            }
            else
            {
                this.setState({
                    isSelectedYear: true, 
                    year:value
                });
                var obj ={year:value, curPage:1, size: this.state.size};
                this.props.requestDataOfYear(obj);
            }
        }
    }

    queryNext()
    {
        var page =  parseInt(this.props.curPage);
        if(page < this.props.totalPages)
        {
            var next = page + 1;
            var obj ={year:this.props.year, curPage:next, size: this.state.size};
            this.props.requestDataOfYear(obj);
        }
        else
        {
            console.log("no more Next !");
        }
    }

    queryPrev()
    {
        var page =  parseInt(this.props.curPage);
        if(page > 1)
        {
            var prev = page - 1;
            var obj ={year:this.props.year, curPage:prev, size: this.state.size};
            this.props.requestDataOfYear(obj);
        }
        else
        {
            console.log("no more Prev !");
        }
    }

   inputChange(evt){
        if(evt.target.name ==='selLeaveType')
        {
            if (!isEmpty(evt.target.value)){
                this.setState({
                    selLeaveType: evt.target.value
                });
                if(evt.target.value==='1')
                {
                    // Load Leave-Balance
                    this.props.loadLeaveBalance();
                    this.setState({
                        isSelectLeaveType: true
                    });
                }
                else
                {
                    this.setState({
                        isSelectLeaveType: false
                    });
                }
            }
            else{
                this.setState({
                    selLeaveType: '',
                    isSelectLeaveType: false
                });
            }
        }
        if(evt.target.name ==='fDate')
        {
            if (!isEmpty(evt.target.value)){
                this.setState({fDate: evt.target.value});
                //this.TimeApply();
            }
            else{
                this.setState({fDate: ''});
            }
        }
        if(evt.target.name ==='tDate')
        {
            if (!isEmpty(evt.target.value)){
                this.setState({tDate: evt.target.value});
                //this.TimeApply();
            }
            else{
                this.setState({tDate: ''});
            }
        }
        if(evt.target.name ==='fTime')
        {
            if (!isEmpty(evt.target.value)){
                this.setState({fTime: evt.target.value});
            }
            else{
                this.setState({fTime: ''});
            }
        }
        if(evt.target.name ==='tTime')
        {
            if (!isEmpty(evt.target.value)){
                this.setState({tTime: evt.target.value});
            }
            else{
                this.setState({tTime: ''});
            }
        }
        if(evt.target.name ==='txtReason')
        {
            if (!isEmpty(evt.target.value)){
                this.setState({txtReason: evt.target.value});
            }
            else{
                this.setState({txtReason: ''});
            }
        }
        if(evt.target.name ==='txtTotalHour')
        {
            if (!isEmpty(evt.target.value)){
                this.setState({txtTotalHour: evt.target.value});
            }
            else{
                this.setState({txtTotalHour: 0});
            }
        }
    }

    openModal(data,mode)
    {
        //console.log(cDay);
        this.setState({
            modalMode: mode,
        });
        if(mode==='CREATE')
        {
            this.setModalData(null,true);
        } else if (mode === 'INFO')
        {
            this.setModalData(data,false);
        }
        this.toggleModal();
    }

    setModalData(apply, refresh) {
        if (refresh) {
            let checkForNew ={
                selLeaveType: '',
                tDate:'',
                fDate:"",
                txtTotalHour:'',
                txtReason:'',
                informList:'',
                approveList:''
            };
            this.setState({
                selLeaveType:'',
                isSelectLeaveType:false,
                tTime:'23:59',
                fTime:'00:01',
                tDate:'',
                fDate:'',
                txtTotalHour:'',
                txtReason:'',
                informList:[],
                approveList:[],
                checkForNew:checkForNew,
                isCreated:false
            });
        }
        else{
            // View INFO
            //console.log(apply);
            this.props.requestDetailOfLeaveApply(apply.id);
            this.setState({editingLeaveApply:apply});
        }
    }

    toggleModal() {
        this.setState({
            Modal: !this.state.Modal,
        });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleData() {
        this.setState({ collapseData: !this.state.collapseData });
    }

    toggleInfo() {
        this.setState({ collapseInfo: !this.state.collapseInfo });
    }

    getLabel(key)
    {
        switch(key)
        {
            case 'id':{
                return 'User ID';
            }
            case 'fullName':{
                return 'Full name';
            }
            case 'userName':{
                return 'Username';
            }
            case 'positionName':{
                return 'Position';
            }
            case 'groupName':{
                return 'Managed Group';
            }
            case 'email':{
                return 'Email';
            }
            case 'depName':{
                return 'Department';
            }
            case 'birthday':{
                return 'Birthday';
            }
            default:{
                return 'No Caption';
            }
        }
    }

    getStatusColor = (status) => {
        if (typeof status === 'number') status = status.toString();
        return status === '1' ? 'secondary' :
          status === '0' ? 'warning' :
            status === '3' ? 'success' :
              status === '4' ? 'danger' :
                'info'
    }

    getStatusColor1 = (status) => {
        if (typeof status === 'number') status = status.toString();
        return status === '1' ? '#6c757d' :
          status === '0' ? '#ffc107' :
            status === '3' ? '#28a745' :
              status === '4' ? '#dc3545' :
                'info'
    }

    getStatusText = (status,list) => {
        for(var i=0; i<list.length; i++)
        {
            if(list[i].value === status || list[i].value.toString() === status)
            {
                return list[i].displayAs;
            }
        }
    }

    getTypeText = (type,list) => {
        //console.log(type);
        for(var i=0; i<list.length; i++)
        {
            if(list[i].value === type || list[i].value.toString() === type || list[i].value.toString() === type.toString())
            {
                return list[i].displayAs;
            }
        }
    }

    getStatusText1 = (status) => {
        if (typeof status === 'number') status = status.toString();
        return status === '1' ? 'Pending Approval' :
          status === '0' ? 'Canceled' :
            status === '3' ? 'Approved' :
              status === '4' ? 'Rejected' :
                ''
    }

    formatDate(date) {
        if(typeof date === "string" && date.length>19)
        {
            date = date.substring(0, 19);
        }
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

    getApplyType = (type) => {
        if(typeof type === "number") type = type.toString();
        return type === '1' ? 'Annual Leave' :
        type === '2' ? 'Leave without payment' :
            ''
    }

    personItem = ({ item }) => (
        <span>
          <strong>{item.id} - {item.userName}</strong>
          { " " + item.fullName }
        </span>
    );

    getUserInfo(usr)
    {
        let user = {
            id:usr.id,
            userName:usr.userName,
            fullName:usr.fullName,
            positionName:usr.positionId +" - " +usr.positionName,
            groupName:usr.groupInit +" - " + usr.groupName,
            email:usr.email,
            depName:usr.departmentId+" - " + usr.depName,
            birthday: this.formatDate(usr.birthday),
        };
        return user;
    }

    getStt(i,page,size)
    {
        return (page - 1)*size + i + 1;
    }

    getTotal(numbers)
    {
        return numbers.reduce((a, b) => a + b, 0);
    }

    render() {
        const user = this.getUserInfo(this.props.curUser);
        const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]];
        const informPeople = this.props.lsInformee;
        const approvePeople = this.props.lsApprover;
        const lsStatus = this.props.lsStatus;
        const lsLeaveType = this.props.lsLeaveType;
        const lsStatusDetail = this.props.lsStatusDetail;
        const lsLeaveDetailType = this.props.lsLeaveDetailType;

        const leaveBalance = this.props.leaveBalance;

        const lsLeaveApply = this.props.lsLeaveApply;
        const newLeaveApply = this.props.newLeaveApply;
        const errors = this.props.errors;

        const curPage =  this.props.curPage;
        const size =  this.props.size;
        const totalPages = this.props.totalPages;
        const totalRecords = this.props.totalRecords;

        const statistic = this.props.statistic;
        //console.log(editingLeaveApply);

        const apply = this.state.editingLeaveApply;
        const lsLeaveApplyDetail = this.props.lsLeaveApplyDetail;
        console.log(apply);
        const pie = {
            labels: [
                this.getStatusText('1',lsStatus),
                this.getStatusText('0',lsStatus),
                this.getStatusText('3',lsStatus),
                this.getStatusText('4',lsStatus)
            ],
            datasets: [
            {
                data: statistic,
                backgroundColor: [
                    this.getStatusColor1('1'),
                    this.getStatusColor1('0'),
                    this.getStatusColor1('3'),
                    this.getStatusColor1('4')
                ],
                hoverBackgroundColor: [
                    this.getStatusColor1('1'),
                    this.getStatusColor1('0'),
                    this.getStatusColor1('3'),
                    this.getStatusColor1('4')
                ],
            }],
        };
        //console.log(this.state.txtTotalHour);
        //console.log(errors.createNewLeaveApply == undefined);
        return (
            <section>
                <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                    <Card>
                        <CardHeader>
                        <i className="fas fa-atom"></i> Application for Leave
                        <div className="card-header-actions">    
                            { this.state.collapse && (
                                <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="fas fa-angle-up"></i></a>
                            )}
                            { !this.state.collapse && (
                                <a className="card-header-action btn btn-maximize" data-target="#collapseExample" onClick={this.toggle}><i className="fas fa-angle-down"></i></a>
                            )}
                        </div>
                        </CardHeader>
                        <Collapse isOpen={this.state.collapse} id="collapseExample">
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
                                { !this.state.isSelectedYear ? '' : (
                                    <FormGroup>
                                        <Label >Actions</Label>
                                        <p>
                                            <Button onClick={e=>this.openModal(null,'CREATE')} color="primary" className="btn-facebook btn-brand mr-1 mb-1"><i className="fas fa-plus"></i><span > Add New Leave Application</span></Button>
                                        </p>
                                    </FormGroup>
                                )}
                                </Col>
                                <Col md="3">
                                    { this.state.isSelectedYear && this.props.error === true && errors.requestDataOfYear != undefined && (
                                        <Alert color="danger">
                                            <h4 className="alert-heading">Error !</h4>
                                            <hr />
                                            <p className="pError">
                                                Something went wrong! {this.props.message}
                                            </p>
                                        </Alert>
                                    )}  
                                    { this.state.isSelectedYear && this.props.error === false && this.props.lsLeaveApply.length === 0 && (
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
                        </Collapse>
                    </Card>
                </Fade>
                {this.state.isSelectedYear && (
                <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                    <Row style={{marginTop:25}}>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                <i className="fa fa-align-justify"></i> My Leave Applications of year <strong>[{this.props.year}]</strong>
                                <div className="card-header-actions">
                                    { this.state.collapseData && (
                                        <a className="card-header-action btn btn-minimize" data-target="#collapseData" onClick={this.toggleData}><i className="fas fa-angle-up"></i></a>
                                    )}
                                    { !this.state.collapseData && (
                                        <a className="card-header-action btn btn-maximize" data-target="#collapseData" onClick={this.toggleData}><i className="fas fa-angle-down"></i></a>
                                    )}
                                </div>
                                </CardHeader>
                                <Collapse isOpen={this.state.collapseData} id="collapseData">
                                <CardBody>
                                    <Table responsive size="sm">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Leave Application</th>
                                            <th>Leave Type</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {   lsLeaveApply.length > 0 && lsLeaveApply.map((i,stt) =>
                                                    <tr key={i.id} className="trLeaveApply">
                                                        <td>
                                                            {this.getStt(stt,curPage,size)}
                                                        </td>
                                                        <td>
                                                            <Badge className="mr-2" color="light" pill>ID#{i.id}</Badge> <br/> 
                                                            From  <span className="datetimeStr"><i className="far fa-clock"></i> {this.formatDate(i.fromTime)}</span><br/>
                                                            To    <span className="datetimeStr"><i className="far fa-clock"></i> {this.formatDate(i.toTime)}</span>
                                                            <p className="pReason">Reason:  <mark>{i.note}</mark></p>
                                                        </td>
                                                        <td>
                                                            <span className="spanApplyType">{this.getApplyType(i.applyType)} </span> <br/>
                                                            Total hour(s) : <strong>{i.totalWorkingHour}</strong>
                                                        </td>
                                                        <td>
                                                            Created on <br/>
                                                            <span className="datetimeStr">{this.formatDate(i.createdOn)}</span><br/>
                                                        </td>
                                                        <td>
                                                            <Badge color={this.getStatusColor(i.status)}>{this.getStatusText(i.status,lsStatus)}</Badge>
                                                        </td>
                                                        <td>
                                                            <Button size="sm" className="btn-pill" outline color="info" onClick={e => this.openModal(i, 'INFO')}><i className="fas fa-info"></i></Button>
                                                            { (i.status === 1 || i.status === '1') && (
                                                                <Button size="sm" className="btn-pill" outline color="danger" onClick={e => this.deleteApply(i.id)}><i className="fas fa-trash-alt"></i></Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                    {totalPages > 1 && (
                                        <Pagination>
                                            <PaginationItem><PaginationLink previous tag="button" onClick={this.queryPrev}>Prev</PaginationLink></PaginationItem>
                                            <PaginationItem><PaginationLink tag="button">{curPage}</PaginationLink></PaginationItem>
                                            <PaginationItem><PaginationLink next tag="button" onClick={this.queryNext}>Next</PaginationLink></PaginationItem>
                                        </Pagination>
                                    )}
                                </CardBody>
                                </Collapse>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                <i className="fas fa-highlighter"></i>  My Leave Application Info of year <strong>[{this.props.year}]</strong>
                                <div className="card-header-actions">
                                    { this.state.collapseInfo && (
                                        <a className="card-header-action btn btn-minimize" data-target="#collapseInfo" onClick={this.toggleInfo}><i className="fas fa-angle-up"></i></a>
                                    )}
                                    { !this.state.collapseInfo && (
                                        <a className="card-header-action btn btn-maximize" data-target="#collapseInfo" onClick={this.toggleInfo}><i className="fas fa-angle-down"></i></a>
                                    )}
                                </div>
                                </CardHeader>
                                <Collapse isOpen={this.state.collapseInfo} id="collapseInfo">
                                    <CardBody>
                                        <div className="chart-wrapper">
                                            <Pie data={pie} />
                                        </div>
                                        <Table size="sm">
                                            <tbody>
                                            {
                                                userDetails.map(([key, value]) => {
                                                    return (
                                                        <tr key={key}>
                                                        <td>{this.getLabel(`${key}`)}</td>
                                                        <td>{value}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                        <Row>
                                            <Col md={{ size: 5, offset: 3 }}>
                                                <Badge color={this.getStatusColor('1')}>{this.getStatusText('1',lsStatus)}</Badge>
                                            </Col>
                                            <Col  md="2">
                                                {statistic[0]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ size: 5, offset: 3 }}>
                                                <Badge color={this.getStatusColor('0')}>{this.getStatusText('0',lsStatus)}</Badge>
                                            </Col>
                                            <Col md="2">
                                                {statistic[1]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ size: 5, offset: 3 }}>
                                                <Badge color={this.getStatusColor('3')}>{this.getStatusText('3',lsStatus)}</Badge>
                                            </Col>
                                            <Col md="2">
                                                {statistic[2]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ size: 5, offset: 3 }}>
                                                <Badge color={this.getStatusColor('4')}>{this.getStatusText('4',lsStatus)}</Badge>
                                            </Col>
                                            <Col md="2">
                                                {statistic[3]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ size: 6, offset: 2 }}>
                                                <Label>Total Leave Application</Label>
                                            </Col>
                                            <Col md="3">
                                                <p className="form-control-static">{this.getTotal(statistic)}</p>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                   
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </Fade>
                )}
                <Modal size="lg" isOpen={this.state.Modal} toggle={this.toggleModal}>
                    { this.state.modalMode === 'CREATE' && (
                        <ModalHeader toggle={this.toggleModal}><i className="far fa-calendar-plus"></i> Apply for new Leave Application</ModalHeader>
                    )}
                    { this.state.modalMode === 'INFO' && (
                        <ModalHeader toggle={this.toggleModal}><i className="fas fa-clipboard-check"></i> Leave Application Information - Id#{apply.id}</ModalHeader>
                    )}
                    { this.state.modalMode === 'CREATE' && (
                        <ModalBody>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label htmlFor="selLeaveType">Please select Leave Type</Label>
                                        <Input value={this.state.selLeaveType} type="select" name="selLeaveType" id="selLeaveType" onChange={this.inputChange} required>
                                            <option value="">-- Please select Leave Type --</option>
                                            { lsLeaveType.map((item) =>
                                                <option key={item.value} value={item.value}>Apply for {item.displayAs}</option>
                                            )}
                                        </Input>
                                        { this.state.checkForNew.selLeaveType !=='' && this.state.checkForNew.selLeaveType !== undefined && (
                                            <p className="pErrorText">{this.state.checkForNew.selLeaveType}</p>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    { this.state.isSelectLeaveType && (
                                        <Alert color="warning">
                                        Your leave balance is <a href="#" className="alert-link">{leaveBalance.balance} (hours)</a>. <br/>
                                        Outstanding balance is <a href="#" className="alert-link">{leaveBalance.outStanding} (hours)</a>
                                        </Alert>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                <FormGroup>
                                        <Label for="fDate">From Date</Label>
                                        <Input
                                            type="date"
                                            name="fDate"
                                            id="fDate"
                                            placeholder="form Date"
                                            value={this.state.fDate}
                                            onChange={this.inputChange}
                                        />
                                        { this.state.checkForNew.fDate !=='' && this.state.checkForNew.fDate !== undefined && (
                                            <p className="pErrorText">{this.state.checkForNew.fDate}</p>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="fTime">Time</Label>
                                        <Input
                                            type="time"
                                            name="fTime"
                                            id="fTime"
                                            placeholder="time time"
                                            value={this.state.fTime}
                                            onChange={this.inputChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="tDate">To Date</Label>
                                        <Input
                                            type="date"
                                            name="tDate"
                                            id="tDate"
                                            placeholder="to Date"
                                            value={this.state.tDate}
                                            onChange={this.inputChange}
                                        />
                                        { this.state.checkForNew.tDate !==''  && this.state.checkForNew.tDate !== undefined && (
                                            <p className="pErrorText">{this.state.checkForNew.tDate}</p>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label for="tTime">Time</Label>
                                        <Input
                                            type="time"
                                            name="tTime"
                                            id="tTime"
                                            placeholder="to time"
                                            value={this.state.tTime}
                                            onChange={this.inputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label htmlFor="txtTotalHour">Total Hour(s)</Label>
                                        <Input type="number" value={this.state.txtTotalHour} readOnly/>
                                        { this.state.checkForNew.txtTotalHour !=='' && this.state.checkForNew.txtTotalHour !== undefined  && (
                                            <p className="pErrorText">{this.state.checkForNew.txtTotalHour}</p>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Label htmlFor="txtReason">Reason</Label>
                                        <Input required style={{resize: 'none'}} type="textarea" value={this.state.txtReason}  onChange={this.inputChange} id="txtReason" name="txtReason"  placeholder="Please input your reason..." required/>
                                        { this.state.checkForNew.txtReason !=='' && this.state.checkForNew.txtReason !== undefined  && (
                                            <p className="pErrorText">{this.state.checkForNew.txtReason}</p>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label htmlFor="selInformTo">Inform to</Label>
                                        <Multiselect
                                        value={this.state.informList}
                                        id="selInformTo" name="selInformTo"
                                        tagComponent={this.personItem}
                                        textField={item => item.fullName + ' - ' + item.positionName}
                                        data={informPeople}
                                        onChange={value => this.setState({ informList: value })}
                                        />
                                        { this.state.checkForNew.informList !=='' && this.state.checkForNew.informList !== undefined &&  (
                                            <p className="pErrorText">{this.state.checkForNew.informList}</p>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label htmlFor="selApprover">Add your Approver</Label>
                                        <Multiselect
                                        value={this.state.approveList}
                                        id="selApprover" name="selApprover"
                                        tagComponent={this.personItem}
                                        textField={item => item.fullName + ' - ' + item.positionName}
                                        data={approvePeople}
                                        onChange={value => this.setState({ approveList: value })}
                                        />
                                        { this.state.checkForNew.approveList !==''  && this.state.checkForNew.approveList !== undefined && (
                                            <p className="pErrorText">{this.state.checkForNew.approveList}</p>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    { this.props.message === '' && errors.createNewLeaveApply != undefined && this.state.isCreated && (
                                        <Alert color="success">
                                            Your Leave Application has been created successfully ! Id is <a href="#" className="alert-link"> #{newLeaveApply.id}</a>
                                        </Alert>
                                    )}
                                    { this.props.message === 'Exists data' && errors.createNewLeaveApply != undefined && this.state.isCreated && (
                                        <Alert color="danger">
                                        {errors.createNewLeaveApply} 
                                        <p style={{fontSize:'0.8em',fontWeight:'normal'}}>The existing Leave Application id is #{newLeaveApply.id},
                                        <br/>with leave time is from [{this.formatDate(newLeaveApply.fromTime)}] to [{this.formatDate(newLeaveApply.toTime)}] !!
                                        </p>
                                        </Alert>
                                    )}
                                </Col>
                            </Row>
                        </ModalBody>
                    )}
                    { this.state.modalMode === 'INFO' && (
                        <ModalBody>
                            <Row>
                                <Col md="7">
                                    <Table size="sm" bordered>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    ID#{apply.id} <br/>
                                                </td>
                                                <td>
                                                    <Badge className="mr-1" color="light">{this.getTypeText(apply.applyType,lsLeaveType)}</Badge> <br/>
                                                    <small>Created on [{this.formatDate(apply.createdOn)}]</small>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <strong>Reason</strong> <br/>
                                                    <mark>{apply.note}</mark>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md="5">
                                    <Table size="sm" bordered>
                                        <tbody>
                                            <tr>
                                                <td style={{width:'30%'}}><strong>Status</strong></td>
                                                <td>
                                                    <Badge className="mr-1" color={this.getStatusColor(apply.status)}>{this.getStatusText(apply.status,lsStatus)}</Badge>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>From time</strong></td>
                                                <td> {this.formatDate(apply.fromTime)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>To time</strong></td>
                                                <td> {this.formatDate(apply.toTime)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total Hour(s)</strong></td>
                                                <td><Badge className="mr-1" pill>{apply.totalWorkingHour}</Badge></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Label>More info of Leave Application id <strong>[{apply.id}]</strong></Label>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th style={{width:'5%'}}>#</th>
                                        <th style={{width:'30%'}}>Action</th>
                                        <th style={{width:'30%'}}>Action by</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lsLeaveApplyDetail.map((i,stt) =>
                                        <tr key={i.id}>
                                            <td>{stt+1}</td>
                                            <td>
                                                <Badge className="mr-1" color="light" pill>
                                                {this.getTypeText(i.applyDetailType,lsLeaveDetailType)}
                                                </Badge>
                                                <p className="pReason">Comment:  <mark>{isEmpty(i.comment)?'No comment!':i.comment}</mark></p>
                                            </td>
                                            <td>
                                                <small><i className="fas fa-user"></i> {i.firstName} {i.lastName}</small><br/>
                                                <small><i className="far fa-address-card"></i> {i.positionName}</small> <br/>
                                                <small><i className="fas fa-landmark"></i> {i.depName}</small><br/>
                                            </td>
                                            <td>
                                                <Badge color={this.getStatusColor(i.status)}>{this.getStatusText(i.status,lsStatusDetail)}</Badge>
                                            </td>
                                            <td>
                                                <small>Create on: {this.formatDate(i.createdOn)}</small><br/>
                                                { i.modifiedOn !== '' && i.modifiedOn !== null && i.modifiedOn != undefined && (
                                                    <small>Modified on: {this.formatDate(i.modifiedOn)}</small>
                                                )}
                                            </td>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </ModalBody>
                    )}
                    <ModalFooter>
                        { this.state.modalMode === 'CREATE' && (
                            <Button color="primary" onClick={this.createNewApplication}>Apply for Leave</Button>
                        )}
                        <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}

export default connect(
    state => state.applyLeave,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ApplyLeave);