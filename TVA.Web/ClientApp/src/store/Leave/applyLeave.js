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
import { LeaveService } from '../../services';
import { Token } from '../../utilities/token';

const requestLoadCodeType = 'REQUEST_LOAD_CODE';
const receiveLoadCodeType = 'RECEIVE_LOAD_CODE';

const requestLoadLeaveBalance = 'REQUEST_LOAD_LB';
const receiveLoadLeaveBalance = 'RECEIVE_LOAD_LB';

const requestSearchType = 'REQUEST_LEAVEAPPLY_SEARCH';
const receiveSearchType = 'RECEIVE_LEAVEAPPLY_SEARCH';

const requestCreateType = 'REQUEST_LEAVEAPPLY_CREATE';
const receiveCreateType = 'RECEIVE_LEAVEAPPLY_CREATE';

const requestDetailType = 'REQUEST_LEAVEAPPLYDETAIL_SEARCH';
const receiveDetailType = 'RECEIVE_LEAVEAPPLYDETAIL_SEARCH';

const requestDeleteType = 'REQUEST_HOLIDAY_DELETE';
const receiveDeleteType = 'RECEIVE_HOLIDAY_DELETE';

const errorType = 'ERR_CONNECTION_REFUSED';

const initialState = {
    lsHolidays:[],
    leaveBalance:{},
    newLeaveApply: {},
    editingLeaveApply: {},
    lsLeaveApply: [],
    lsLeaveApplyDetail: [],
    statistic:[],
    curPage:1,
    size:10,
    totalRecords:0,
    totalPages:0,
    lsStatus: [],
    lsStatusDetail: [],
    lsLeaveType: [],
    lsLeaveDetailType: [],
    lsInformee:[],
    lsApprover:[],
    curUser:{},
    error: false,
    message: '',
    isLoading: false,
    errors: {},
    year:''
};

export const actionCreators = {
    loadCode: () => async (dispatch, getState) => {
        let usr = Token.getUser();
        dispatch({ type: requestLoadCodeType });
        let t = {
            id: usr.Id
        };

        let svc = new LeaveService();
        svc.loadCodeForLeaveApply(t).then(rsp => {
            if (rsp.success) {
                // /console.log(rsp);
                dispatch({ 
                    type: receiveLoadCodeType, 
                    success: rsp.success,
                    data: rsp.data, 
                    errors: {loadCodeForLeaveApply:''},
                    message: rsp.message });
            }
            else {
                dispatch({ 
                    type: errorType, 
                    errors: {loadCodeForLeaveApply: rsp.message},
                    message: 'Error connection to Server!' });
            }
        });
    },
    loadLeaveBalance: () => async (dispatch, getState) => {
        let usr = Token.getUser();
        dispatch({ type: requestLoadLeaveBalance });
        let t = {
            id: usr.Id
        };

        let svc = new LeaveService();
        svc.loadLeaveBalance(t).then(rsp => {
            if (rsp.success) {
                //console.log(rsp);
                dispatch({ 
                    type: receiveLoadLeaveBalance, 
                    success: rsp.success,
                    data: rsp.data, 
                    errors: {loadLeaveBalance:''},
                    message: rsp.message });
            }
            else {
                dispatch({ 
                    type: errorType, 
                    errors: {loadLeaveBalance: rsp.message},
                    message: 'Error connection to Server!' });
            }
        });
    },    
    requestDataOfYear: obj => async (dispatch, getState) => {
        let usr = Token.getUser();

        dispatch({ type: requestSearchType, year: obj.year });

        let t = {
            id: usr.Id,
            keyword: obj.year+"-"+ obj.curPage+"-"+ obj.size,
        };

        let svc = new LeaveService();
        svc.getAllLeaveApply(t).then(res => {
            //console.log(res);
            if (res.success) {
                dispatch({ 
                    type: receiveSearchType, 
                    year: obj.year, 
                    error: !res.success,
                    errors: {requestDataOfYear:''},
                    curPage: res.data.page,
                    size: res.data.size,
                    totalPages: res.data.totalPages,
                    totalRecords: res.data.totalRecords,
                    statistic: res.data.statistic,
                    lsLeaveApply: res.data.data });
            }
            else {
                dispatch({ 
                    type: errorType,  
                    year: obj.year, 
                    lsLeaveApply: [], 
                    error: !res.success,
                    errors: {requestDataOfYear:res.message},
                    message: 'Error connection to Server!' });
            }
        });
    },
    createNewLeaveApply: obj => async (dispatch, getState) => {
        console.log(obj);
        dispatch({ type: requestCreateType });
        let svc = new LeaveService();
        svc.createFull(obj).then(res => {
            console.log(res);
            if (res.success) {
                dispatch({ 
                    type: receiveCreateType, 
                    newLeaveApply: res.data.leaveApply, 
                    errors: {createNewLeaveApply:''},
                    error:false,
                    message: "" });
            }
            else {
                if (res.message === 'Exists data') {
                    dispatch({ 
                        type: receiveCreateType, 
                        newLeaveApply: res.data,
                        errors: {createNewLeaveApply:'Your leave application is overlaid with some other leave application in the system !'},
                        error:true,
                        message: res.message });
                }
                else {
                    dispatch({ 
                        type: errorType,
                        error:true,
                        errors: {createNewLeaveApply:res.message},
                        message: 'Error connection to Server!' });
                }
            }
        });
        
    }, 
    requestDetailOfLeaveApply: obj => async (dispatch, getState) => {
        dispatch({ type: requestDetailType });

        let t = {
            id: obj,
        };

        let svc = new LeaveService();
        svc.loadLeaveApplyDetail(t).then(res => {
            console.log(res);
            if (res.success) {
                dispatch({ 
                    type: receiveDetailType, 
                    error: !res.success,
                    errors: {requestDetailOfLeaveApply:''},
                    lsLeaveApplyDetail: res.data });
            }
            else {
                dispatch({ 
                    type: errorType,  
                    year: obj.year, 
                    lsLeaveApplyDetail: [], 
                    error: !res.success,
                    errors: {requestDetailOfLeaveApply:res.message},
                    message: 'Error connection to Server!' });
            }
        });
    },
    deleteApply: did => async (dispatch, getState) => {
        let t = {
            id: did,
        };

        dispatch({ type: requestDeleteType });

        let svc = new LeaveService();
        svc.deleteApply(t).then(res => {
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
};

export const reducer = (state, action) => {
    state = state || initialState;

    //Load Code
    if (action.type === requestLoadCodeType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveLoadCodeType) {
        //console.log(action);
        return {
            ...state,
            curUser:action.data.curUser,
            lsApprover:action.data.lsApprover,
            lsInformee:action.data.lsInformee,
            lsLeaveDetailType:action.data.lsLeaveDetailType,
            lsLeaveType:action.data.lsLeaveType,
            lsStatus:action.data.lsStatus,
            lsStatusDetail:action.data.lsStatusDetail,
            lsHolidays:action.data.lsHolidays,
            error: !(action.success),
            message: action.error,
            isLoading: false,
            errors: action.errors
        };
    }

    //Load Leave Balance
    if (action.type === requestLoadLeaveBalance) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveLoadLeaveBalance) {
        //console.log(action);
        return {
            ...state,
            leaveBalance: action.data,
            error: !(action.success),
            message: action.error,
            isLoading: false
        };
    }

    // Search
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
            year: action.year,
            error:action.error,
            message: action.message,
            errors: action.errors,
            lsLeaveApply: action.lsLeaveApply,
            curPage: action.curPage,
            size: action.size,
            totalPages: action.totalPages,
            totalRecords: action.totalRecords,
            statistic: action.statistic,
            isLoading: false
        };
    }

    // Create
    if (action.type === requestCreateType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveCreateType) {
        let arr = state.lsLeaveApply;
        if (action.message === '') {
            arr.unshift(action.newLeaveApply);
        }
        return {
            ...state,
            lsLeaveApply: arr,
            newLeaveApply: action.newLeaveApply,
            error: action.error,
            errors: action.errors,
            message: action.message,
            isLoading: false
        };
    }

    // Load Detail
    if (action.type === requestDetailType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveDetailType) {
        return {
            ...state,
            lsLeaveApplyDetail: action.lsLeaveApplyDetail,
            error: action.error,
            errors: action.errors,
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
        let arr = state.lsLeaveApply;
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
            lsLeaveApply: arr,
            isDeleted: action.isDeleted,
            message: action.message,
            isLoading: false
        };
    }

    /// Error
    if (action.type === errorType) {
        return {
            ...state,
            error: true,
            message: action.message,
            isLoading: false,
            errors: action.errors
        };
    }

    return state;
};
