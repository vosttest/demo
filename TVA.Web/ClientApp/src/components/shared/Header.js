import React, { Component } from 'react';
import { Token } from '../../utilities';
import { Collapse, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Home';

// routes config
import routes from '../../routes';

import {
    AppBreadcrumb   
  } from '@coreui/react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            username:'',
            fullname:'',
        };
    }

    componentDidMount() 
    {
        let t = Token.getUser();
        //console.log(t);
        this.props.getUsername();
        this.setState({
            username: this.props.currentUsername,
            fullname: t.FullName
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentWillReceiveProps(propsNext) {
        if (propsNext.goOut) {
            this.props.handleResetGoOut();
            this.props.history.replace('/');
        }
    }

    render() {
         const { handleSignOut } = this.props;
        return (
            <header>
                <div className="oneSystemMessage">
                    <div className="system-message level-info slds-theme_info">
                        <span className="info-logged">
                            <i className="icon fas fa-user"></i>
                            Logged in as [{this.state.fullname}]
                        </span>
                        <a className="action-link" href="" onClick={handleSignOut}>Log out as [{this.state.fullname}] </a>
                    </div>
                </div>
                <Navbar className="navbar-expand-md navbar-toggleable-md navbar" light >
                    {/* <div className="user-role">Administrator</div> */}
                    <NavbarToggler onClick={this.toggle} className="mr-2" />
                    <Collapse className="d-md-inline-flex flex-md-row-reverse" isOpen={this.state.isOpen} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                               <NavLink className="nav-link not-active" activeClassName="nav-active" to="#">
                                    Home
                                </NavLink>
                                <ul className="navbar-child">
                                    <NavLink exact className="nav-link" activeClassName="nav-active" to="/home">
                                        Dashboard
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/home/my-profile">
                                        My profile
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/home/my-department">
                                        My department
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/home/leave-information">
                                        Leave Information
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/home/my-notification">
                                        My Notification
                                        </NavLink>
                                </ul>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link not-active" activeClassName="nav-active" to="#">
                                    Application
                                </NavLink>
                                <ul className="navbar-child">
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/application/apply-leave">
                                        Apply Leave
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/application/apply-ot">
                                        Apply OT
                                        </NavLink>
                                </ul>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link not-active" activeClassName="nav-active" to="#">
                                    Approval
                                </NavLink>
                                <ul className="navbar-child">
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/approval/approval-leave">
                                        Approve Leave
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/approval/approval-late">
                                        Approve Latency
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/approval/approval-ot">
                                        Approve OT
                                        </NavLink>
                                </ul>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link not-active" activeClassName="nav-active" to="#">
                                    HR Setting
                                </NavLink>
                                <ul className="navbar-child">
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/hr/holidays">
                                        Holidays
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/hr/leave-balance">
                                        Leave Balance
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/hr/user">
                                        User
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/hr/position">
                                        Position
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/hr/news">
                                        News
                                        </NavLink>
                                </ul>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link not-active" activeClassName="nav-active" to="#">
                                    System Setting
                                </NavLink>
                                <ul className="navbar-child">
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/sys/role">
                                        Role
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/sys/user-role">
                                        User role
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/sys/group">
                                        Group
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/sys/notification">
                                        Notification
                                        </NavLink>
                                </ul>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link not-active" activeClassName="nav-active" to="#">
                                    Reports
                                </NavLink>
                                <ul className="navbar-child">
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/report/lafency">
                                        Latency
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/report/time-keep">
                                        Attendance
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/report/ot">
                                        OT
                                        </NavLink>
                                    <NavLink className="nav-link" activeClassName="nav-active" to="/report/leave">
                                        Leave
                                        </NavLink>
                                </ul>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
                <AppBreadcrumb appRoutes={routes} />
            </header>
        );
    }
}

export default withRouter(connect(
    state => state.home,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Header));