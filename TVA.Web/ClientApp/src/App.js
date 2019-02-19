import React from 'react';
import { Redirect, Switch, Route } from 'react-router';
import NotFoundPage from './components/shared/NotFoundPage';
import PrivateRoute from './PrivateRoute';

import ForgotPassword from './components/User/ForgotPassword';
import FirstTime from './components/User/FirstTime';
import UserSignIn from './components/User/SignIn'
import UserSearch from './components/User/Search'

import Home from './components/Home/Home';
import MyProfile from './components/User/MyProfile';
import MyDepartment from './components/User/MyDepartment';
import LeaveInformation from './components/Leave/LeaveInformation';
import MyNotification from './components/User/Notification/MyNotification';

import ApprovalLeave from './components/Leave/LeaveApproval';
import ApprovalLate from './components/Approval/ApprovalLate';
import ApprovalOt from './components/Approval/ApprovalOt';
import ApprovalLeaveDetail from './components/Leave/ApprovalLeaveDetail';

import ApplyLeave from './components/Leave/LeaveApply';
import ApplyOt from './components/Application/ApplyOt';

import Holidays from './components/Hr/Holidays/Holidays';
import LeaveBalance from './components/Leave/LeaveBalance';
import User from './components/Hr/User/User';
import Position from './components/Hr/Position/Position';
import News from './components/Hr/News/News';

import Role from './components/Sys/Role/Role';
import UserRole from './components/Sys/UserRole/UserRole';
import Group from './components/Sys/Group/Group';
import Notification from './components/Sys/Notification/Notification';

import Lafency from './components/Report/Lafency/Lafency';
import TimeKeep from './components/Report/TimeKeep/TimeKeep';
import ReportLeave from './components/Report/ReportLeave/ReportLeave';
import ReportOt from './components/Report/ReportOt/ReportOt';

export default () => (
    <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute path="/home/my-profile" component={MyProfile}></PrivateRoute>
        <PrivateRoute path='/home/my-department' component={MyDepartment}></PrivateRoute>
        <PrivateRoute path='/home/leave-information' component={LeaveInformation}></PrivateRoute>
        <PrivateRoute path='/home/my-notification' component={MyNotification}></PrivateRoute>

        <PrivateRoute path='/application/apply-leave' component={ApplyLeave}></PrivateRoute>
        <PrivateRoute path='/application/apply-ot' component={ApplyOt}></PrivateRoute>

        <PrivateRoute path='/approval/approval-leave' component={ApprovalLeave}></PrivateRoute>
        <PrivateRoute path='/approval/approval-late' component={ApprovalLate}></PrivateRoute>
        <PrivateRoute path='/approval/approval-ot' component={ApprovalOt}></PrivateRoute>
        <PrivateRoute path='/approval/approval-leave-detail' component={ApprovalLeaveDetail}></PrivateRoute>

        <PrivateRoute path='/hr/holidays' component={Holidays}></PrivateRoute>
        <PrivateRoute path='/hr/leave-balance' component={LeaveBalance}></PrivateRoute>
        <PrivateRoute path='/hr/user' component={User}></PrivateRoute>
        <PrivateRoute path='/hr/position' component={Position}></PrivateRoute>
        <PrivateRoute path='/hr/news' component={News}></PrivateRoute>

        <PrivateRoute path='/sys/role' component={Role}></PrivateRoute>
        <PrivateRoute path='/sys/user-role' component={UserRole}></PrivateRoute>
        <PrivateRoute path='/sys/group' component={Group}></PrivateRoute>
        <PrivateRoute path='/sys/notification' component={Notification}></PrivateRoute>

        <PrivateRoute path='/report/lafency' component={Lafency}></PrivateRoute>
        <PrivateRoute path='/report/time-keep' component={TimeKeep}></PrivateRoute>
        <PrivateRoute path='/report/leave' component={ReportLeave}></PrivateRoute>
        <PrivateRoute path='/report/ot' component={ReportOt}></PrivateRoute>

        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/first-time' component={FirstTime} />
        <Route path='/sign-in' component={UserSignIn} />
        <Route path='/user-search/:page?' component={UserSearch} />
        <Route path='' component={NotFoundPage} />
    </Switch>
)