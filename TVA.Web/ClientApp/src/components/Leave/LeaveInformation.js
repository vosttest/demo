import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/User/LeaveInformation';
import './Leave.css';
import moment from 'moment';
import Loading from './../shared/Loading';
import LeaveInfoCard from './../shared/LeaveInfoCard/LeaveInfoCard';
import shortid from 'shortid';
import Select from 'react-select';

import { GroupService } from '../../services';
import { UserService } from '../../services';

let types = [
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
];

class LeaveInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingTeams: true,
            teamList: [],
            isLoadingUsers: true,
            userList: [],
            isTeamSeleted: false,
        }

        this.handleChangeTeam = this.handleChangeTeam.bind(this);
    }

    getTeamList() {
        let body = {
            paging: false
        }

        let svcTeam = new GroupService();
        svcTeam.read(body).then(res => {
            if (res.success) {
                let teams = res.data.map((team) => (
                    { value: team.id, label: team.description }
                ));

                this.setState({
                    isLoadingTeams: false,
                    teamList: teams
                });
            }
        });
    }

    getUserList(groupId) {
        let body = {
            "filter": {
                "groupId": groupId
            },
            "paging": false
        }

        let svcUser = new UserService();
        svcUser.read(body).then(res => {
            if (res.success) {
                let users = res.data.map((user) => (
                    { value: user.id, label: user.fullName }
                ));

                this.setState({
                    isLoadingUsers: false,
                    userList: users
                });
            }
        });
    }

    handleChangeTeam(team) {
        if (team)
            this.getUserList(team.value);
        else
            this.setState({
                userList: []
            });
        this.props.handleChangeTeam(team);
    }

    componentDidMount() {
        this.getTeamList();
    }

    prevYear = () => moment().subtract(1, 'year').format('Y');
    nextYear = () => moment().add(1, 'year').format('Y');
    year = () => moment().format('Y');

    months = () => moment.months().map((m, i) => ({
        value: i + 1,
        label: m
    }));

    render() {
        let { props } = this.props;

        let years = [
            { value: this.prevYear(), label: this.prevYear() },
            { value: this.year(), label: this.year() },
            { value: this.nextYear(), label: this.nextYear() }
        ];

        let singleCard = this.props.rsp && this.props.rsp.data.length == 1;

        const t = {
            format: this.props.format.value,
            date: `${this.props.year.value}-${this.props.month.value}`
        }

        return (
            <section>
                {this.props.isLoading &&
                    <Loading />
                }

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-3">
                                <span className="card-field">
                                    Username
                                </span>
                                Michel
                            </div>
                            <div className="col-md-3">
                                <span className="card-field">
                                    Total leave (year)
                                </span>
                                3.5
                            </div>
                            <div className="col-md-3">
                                <span className="card-field">
                                    Total Approval leaves
                                </span>
                                2.5
                            </div>
                            <div className="col-md-3">
                                <span className="card-field">
                                    Total unaccepted leaves
                                </span>
                                1
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <span className="card-field">
                                    Team:
                                </span>
                                <Select
                                    isLoading={this.state.isLoadingTeams}
                                    classNamePrefix="select"
                                    defaultValue={this.props.team}
                                    isClearable="true"
                                    isSearchable="true"
                                    name="color"
                                    options={this.state.teamList}
                                    onChange={this.handleChangeTeam}
                                />
                            </div>
                            <div className="col-md-3">
                                <span className="card-field">
                                    User:
                                </span>
                                <Select
                                    value={this.props.user}
                                    isLoading={this.state.isLoadingUsers}
                                    classNamePrefix="select"
                                    isClearable="true"
                                    isSearchable="true"
                                    name="color"
                                    options={this.state.userList}
                                    isDisabled={!this.props.isTeamSeleted}
                                    onChange={this.props.handleChangeUser}
                                />
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Format:
                                </span>
                                <Select
                                    classNamePrefix="select"
                                    defaultValue={this.props.format}
                                    name="color"
                                    options={types}
                                    isDisabled={!this.props.isTeamSeleted}
                                    onChange={this.props.handleChangeFormat}
                                />
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Year:
                                </span>
                                <Select
                                    classNamePrefix="select"
                                    defaultValue={this.props.year}
                                    name="color"
                                    options={years}
                                    isDisabled={!this.props.isTeamSeleted}
                                    onChange={this.props.handleChangeYear}
                                />
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Month:
                                </span>
                                <Select
                                    classNamePrefix="select"
                                    defaultValue={this.props.month}
                                    name="color"
                                    options={this.months()}
                                    isDisabled={!this.props.isTeamSeleted || this.props.isYearFormat}
                                    onChange={this.props.handleChangeMonth}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            type="button"
                            className="btn btn-primary btn-md"
                            onClick={this.props.handleSearch}
                            disabled={!this.props.isTeamSeleted}
                        >
                            Search
                        </button>

                        <button type="button" className="btn btn-primary btn-md">Update</button>
                    </div>
                </div>
                {this.props.rsp != null &&
                    this.props.rsp.data.map((item) => (
                        <LeaveInfoCard
                            key={shortid.generate()}
                            format={t.format}
                            date={t.date}
                            data={item}
                            defaultCollapse={singleCard}
                        />
                    ))
                }

            </section>
        );
    }
}

export default connect(
    state => state.userLeaveInformation,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(LeaveInformation);