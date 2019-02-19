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

import { HolidayService } from '../../services';


const requestSearchType = 'REQUEST_HOLIDAY_SEARCH';
const receiveSearchType = 'RECEIVE_HOLIDAY_SEARCH';


const requestCreateType = 'REQUEST_HOLIDAY_CREATE';
const receiveCreateType = 'RECEIVE_HOLIDAY_CREATE';

const requestDeleteType = 'REQUEST_HOLIDAY_DELETE';
const receiveDeleteType = 'RECEIVE_HOLIDAY_DELETE';

const requestSaveType = 'REQUEST_HOLIDAY_SAVE';
const receiveSaveType = 'RECEIVE_HOLIDAY_SAVE';

const errorType = 'ERR_CONNECTION_REFUSED';

const initialState = {
    newDay: {},
    editingDay: {},
    rsp: [],
    error: false,
    message: '',
    isLoading: false,
    errors: {},
};

export const actionCreators = {
    requestDataOfYear: year => async (dispatch, getState) => {
        let state = getState().yearSearch;
        if (year === state.year) {
            return;
        }
        dispatch({ type: requestSearchType, year });

        let t = {
            keyword: year
        };

        let svc = new HolidayService();
        svc.getAllHolidays(t).then(rsp => {
            //console.log(rsp);
            if (Array.isArray(rsp.data)) {
                dispatch({ type: receiveSearchType, year, rsp: rsp.data });
            }
            else {
                dispatch({ type: errorType, year, rsp: [], message: 'Error connection to Server!' });
            }
        });
    },
    createNewDay: nDay => async (dispatch, getState) => {
        let state = getState().yearSearch;
        //console.log(nDay);
        //console.log(state);
        let t = {
            day: nDay.day,
            month: nDay.month,
            year: nDay.year,
            typeOfDay: nDay.typeOfDay,
            note: nDay.note,
        };

        dispatch({ type: requestCreateType, newDay: t });

        if (state.year !== nDay.year.toString()) {
            //console.log('Year differ');
            dispatch({ type: errorType, message: "Year is incorrect, you are creating Holiday for the year of [" + state.year + '] !' });
        }
        else {
            let svc = new HolidayService();
            svc.create(t).then(res => {
                //console.log(res);
                if (res.success) {
                    dispatch({ type: receiveCreateType, newDay: res.data, message: "" });
                }
                else {
                    if (res.message === 'Exists data') {
                        dispatch({ type: receiveCreateType, newDay: res.data, message: res.message });
                    }
                    else {
                        dispatch({ type: errorType, message: 'Error connection to Server!' });
                    }
                }
            });
        }
    },
    deleteDay: did => async (dispatch, getState) => {
        //let state = getState().yearSearch;
        let t = {
            id: did,
        };

        dispatch({ type: requestDeleteType });

        let svc = new HolidayService();
        svc.delete(t).then(res => {
            //console.log(res);
            if (res.success) {
                dispatch({ type: receiveDeleteType, deletedId: did, isDeleted: true, message: "" });
            }
            else {
                if (res.message !== '') {
                    dispatch({ type: receiveDeleteType, isDeleted: false, message: res.message });
                }
                else {
                    dispatch({ type: errorType, message: 'Error connection to Server!' });
                }
            }
        });
    },
    saveNewDay: nDay => async (dispatch, getState) => {
        //let state = getState().yearSearch;
        //console.log(nDay);
        //console.log(state);
        let t = {
            id: nDay.id,
            day: nDay.day,
            month: nDay.month,
            year: nDay.year,
            typeOfDay: nDay.typeOfDay,
            note: nDay.note,
        };

        dispatch({ type: requestSaveType, newDay: t });

        let svc = new HolidayService();
        svc.update(t).then(res => {
            //console.log(res);
            if (res.success) {
                dispatch({ type: receiveSaveType, editingDay: res.data, message: "" });
            }
            else {
                if (res.message !== '') {
                    dispatch({ type: receiveSaveType, editingDay: res.data, message: res.message });
                }
                else {
                    dispatch({ type: errorType, message: 'Error connection to Server!' });
                }
            }
        });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestSearchType) {
        return {
            ...state,
            year: action.year,
            isLoading: true
        };
    }

    if (action.type === receiveSearchType) {
        return {
            ...state,
            rsp: action.rsp,
            year: action.year,
            error: !Array.isArray(action.rsp),
            message: action.error,
            isLoading: false
        };
    }

    // Create
    if (action.type === requestCreateType) {
        return {
            ...state,
            newDay: action.newDay,
            isLoading: true
        };
    }

    if (action.type === receiveCreateType) {
        let arr = state.rsp;
        if (action.message === '') {
            let arr = state.rsp;
            arr.push(action.newDay);
        }
        //console.log(arr);
        return {
            ...state,
            newDay: action.newDay,
            rsp: arr,
            message: action.message,
            isLoading: false
        };
    }

    //delete
    if (action.type === requestDeleteType) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveDeleteType) {
        let arr = state.rsp;
        if (action.isDeleted) {
            let id = action.deletedId;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === id) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        return {
            ...state,
            rsp: arr,
            isDeleted: action.isDeleted,
            message: action.message,
            isLoading: false
        };
    }

    //update
    if (action.type === requestSaveType) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveSaveType) {
        let arr = state.rsp;
        if (action.message === '') {
            let id = action.editingDay.id;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === id) {
                    arr[i] = action.editingDay;
                    break;
                }
            }
        }
        return {
            ...state,
            rsp: arr,
            editingDay: action.editingDay,
            message: action.message,
            isLoading: false
        };
    }

    ///
    if (action.type === errorType) {
        return {
            ...state,
            rsp: [],
            newDay: {},
            error: true,
            message: action.message,
            isLoading: false
        };
    }

    return state;
};