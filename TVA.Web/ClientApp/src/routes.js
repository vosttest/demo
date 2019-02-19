import Home from './components/Home/Home';
import MyProfile from './components/User/MyProfile';
import MyDepartment from './components/User/MyDepartment';
import LeaveInformation from './components/Leave/LeaveInformation';
import MyNotification from './components/User/Notification/MyNotification';

import ApplyLeave from './components/Leave/LeaveApply';
import ApplyOt from './components/Application/ApplyOt';

import ApprovalLeave from './components/Leave/LeaveApproval';
import ApprovalLate from './components/Approval/ApprovalLate';
import ApprovalOt from './components/Approval/ApprovalOt';
// import ApprovalLeaveDetail from './components/Leave/ApprovalLeaveDetail';

import Holidays from './components/Hr/Holidays/Holidays';
import LeaveBalance from './components/Leave/LeaveBalance';
import User from './components/Hr/User/User';
import Position from './components/Hr/Position/Position';
import News from './components/Hr/News/News';

import Role from './components/Sys/Role/Role';
import UserRole from './components/Sys/UserRole/UserRole';
import Group from './components/Sys/Group/Group';

import Lafency from './components/Report/Lafency/Lafency';
import TimeKeep from './components/Report/TimeKeep/TimeKeep';
import ReportLeave from './components/Report/ReportLeave/ReportLeave';
import ReportOt from './components/Report/ReportOt/ReportOt';

const routes = [
    { path: '/home', exact: true, name: 'Home', component: Home },
    { path: '/home/my-profile', name: 'My Profile', component: MyProfile },   
    { path: '/home/my-department', name: 'My Department', component: MyDepartment },
    { path: '/home/leave-information', name: 'Leave Information', component: LeaveInformation },
    { path: '/home/my-notification', name: 'My Notification', component: MyNotification },
    { path: '/application', exact: true, name: 'Application', component: null },
    { path: '/application/apply-leave', name: 'Apply Leave', component: ApplyLeave },
    { path: '/application/apply-ot', name: 'Apply Overtime Working', component: ApplyOt },
    { path: '/approval', exact: true, name: 'Approval', component: null },
    { path: '/approval/approval-leave', name: 'Approve Leave', component: ApprovalLeave },
    { path: '/approval/approval-late', name: 'Approve Leave', component: ApprovalLate },
    { path: '/approval/approval-ot', name: 'Approve Overtime Working', component: ApprovalOt },
    { path: '/hr', exact: true, name: 'HR Setting', component: null },
    { path: '/hr/holidays', name: 'Holidays Management', component: Holidays },
    { path: '/hr/leave-balance', name: 'Leaves Balance Management', component: LeaveBalance },
    { path: '/hr/user', name: 'Employees Management', component: User },
    { path: '/hr/position', name: 'Positions Management', component: Position },
    { path: '/hr/news', name: 'News Management', component: News },
    { path: '/sys', exact: true, name: 'System Setting', component: null },
    { path: '/sys/role', name: 'Role Management', component: Role },
    { path: '/sys/user-role', name: 'User-Role Management', component: UserRole },
    { path: '/sys/group', name: 'User-Group Management', component: Group },
    { path: '/sys/notification', name: 'Notifications Management', component: null },
    { path: '/report', exact: true, name: 'Report', component: null },
    { path: '/report/lafency', name: 'Report of Latency', component: Lafency },
    { path: '/report/time-keep', name: 'Report of Attendance', component: TimeKeep },
    { path: '/report/leave', name: 'Report of Leaves', component: ReportLeave },
    { path: '/report/ot', name: 'Report of OT Working', component: ReportOt },
  ];
  
  export default routes;