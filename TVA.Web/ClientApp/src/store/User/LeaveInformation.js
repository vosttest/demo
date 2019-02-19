import moment from 'moment';
import { LeaveService } from '../../services';

const changeTeamType = 'CHANGE_TEAM';
const changeUserType = 'CHANGE_USER';
const changeFormatType = 'CHANGE_FORMAT';
const changeYearType = 'CHANGE_YEAR';
const changeMonthType = 'CHANGE_MONTH';
const seachType = 'SEARCH_LEAVE';

const initialState = {
    rsp: { data: [] },
    team: null,
    user: null,
    format: { value: 'month', label: 'Month' },
    year: { value: moment().format('Y'), label: moment().format('Y') },
    month: { value: moment().format('MM'), label: moment().format('MMMM') },
    isYearFormat: false,
    isTeamSeleted: false,
    isLoading: false
};

export const actionCreators = {
    handleChangeTeam: team => async dispatch => {
        if (team)
            return dispatch({ type: changeTeamType, team: team, isTeamSeleted: true });
        dispatch({ type: changeTeamType, isTeamSeleted: false, rsp: null });
    },
    handleChangeUser: user => async dispatch => {
        if (user)
            return dispatch({ type: changeUserType, user: user });
        dispatch({ type: changeUserType, rsp: null });
    },
    handleChangeFormat: format => async dispatch => {
        if (format)
            return dispatch({ type: changeFormatType, format: format, isYearFormat: format.value == 'year' });
    },
    handleChangeYear: year => async dispatch => {
        if (year)
            return dispatch({ type: changeYearType, year: year });
    },
    handleChangeMonth: month => async dispatch => {
        if (month)
            return dispatch({ type: changeMonthType, month: month });
    },
    handleSearch: () => async (dispatch, getState) => {
        const state = getState().userLeaveInformation;

        dispatch({ type: seachType, isLoading: true });

        const t = {
            format: state.format.value,
            date: `${state.year.value}-${state.month.value}`
        }

        let body = {
            groupId: state.team && state.team.value,
            userId: state.user && state.user.value,
            year: 2019
          }

        let svc = new LeaveService();
        svc.read(body).then(res => {
            if (res.success) {                
                dispatch({ type: seachType, isLoading: false, rsp: res });
            }
        });

        // setTimeout(function () {
        //     let rsp = {
        //         data: [
        //             {
        //                 user: state.user,
        //                 team: state.team,
        //                 format: t.format,
        //                 date: t.date,
        //                 leaveDays: [
        //                     {
        //                         date: '2019-02-01T22:05:04.243',
        //                         type: 'approval-leave'
        //                     },
        //                     {
        //                         date: '2019-01-01T22:05:04.243',
        //                         type: 'approval-leave'
        //                     },
        //                     {
        //                         date: '2019-02-11T22:05:04.243',
        //                         type: 'unaccepted-leave'
        //                     },
        //                     {
        //                         date: '2019-02-12T22:05:04.243',
        //                         type: 'unaccepted-leave'
        //                     },
        //                     {
        //                         date: '2019-12-12T22:05:04.243',
        //                         type: 'unaccepted-leave'
        //                     },
        //                     {
        //                         date: '2019-03-12T22:05:04.243',
        //                         type: 'over-time'
        //                     },
        //                     {
        //                         date: '2019-03-11T22:05:04.243',
        //                         type: 'over-time'
        //                     },
        //                     {
        //                         date: '2019-03-11T22:05:04.243',
        //                         type: 'approval-leave'
        //                     },
        //                     {
        //                         date: '2019-02-22T22:05:04.243',
        //                         type: 'unaccepted-leave'
        //                     },
        //                     {
        //                         date: '2019-02-22T22:05:04.243',
        //                         type: 'over-time'
        //                     },
        //                     {
        //                         date: '2019-02-07T22:05:04.243',
        //                         type: 'working-half'
        //                     },
        //                     {
        //                         date: '2019-02-15T22:05:04.243',
        //                         type: 'working-half'
        //                     }
        //                 ]
        //             },
        //             {
        //                 user: state.user,
        //                 team: state.team,
        //                 format: t.format,
        //                 date: t.date,
        //                 leaveDays: [
        //                     {
        //                         date: '2019-02-01T22:05:04.243',
        //                         type: 'approval-leave'
        //                     },
        //                     {
        //                         date: '2019-01-01T22:05:04.243',
        //                         type: 'approval-leave'
        //                     },
        //                     {
        //                         date: '2019-02-11T22:05:04.243',
        //                         type: 'unaccepted-leave'
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // }, 500);
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case changeTeamType:
            return {
                ...state,
                team: action.team,
                isTeamSeleted: action.isTeamSeleted,
                rsp: null,
                user: null
            };
        case changeUserType:
            return {
                ...state,
                user: action.user,
                rsp: null
            };
        case changeFormatType:
            return {
                ...state,
                format: action.format,
                isYearFormat: action.isYearFormat,
                rsp: null
            };
        case changeYearType:
            return {
                ...state,
                year: action.year,
                rsp: null
            };
        case changeMonthType:
            return {
                ...state,
                month: action.month,
                rsp: null
            };
        case seachType:
            return {
                ...state,
                isLoading: action.isLoading,
                rsp: action.rsp
            };
        default:
            return state;
    }
};