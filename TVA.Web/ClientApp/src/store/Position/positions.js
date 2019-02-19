/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 13/02/2019 11:07
 * Update       : 13/02/2019 11:08
 * Checklist    : 1.0
 * Status       : OK
 */

import { CodeService } from '../../services';
import { PositionService } from '../../services';

const requestSearchType = 'REQUEST_POSITION_SEARCH';
const receiveSearchType = 'RECEIVE_POSITION_SEARCH';

const requestGetAllCode = 'REQUEST_CODE_SEARCH';
const receiveGetAllCode = 'RECEIVE_CODE_SEARCH';

const requestCreateType = 'REQUEST_POSITION_CREATE';
const receiveCreateType = 'RECEIVE_POSITION_CREATE';

const requestDeleteType = 'REQUEST_POSITION_DELETE';
const receiveDeleteType = 'RECEIVE_POSITION_DELETE';

const requestSaveType = 'REQUEST_POSITION_SAVE';
const receiveSaveType = 'RECEIVE_POSITION_SAVE';

const errorType = 'ERR_CONNECTION_REFUSED';

const initialState = {
    newPos: {},
    editingPos: {},
    rsp: [],
    rspJobLevel: [],
    rspJobCate: [],
    rspDepart: [],
    rspSalType: [],
    rspPosType: [],
    rspPrefLanguage: [],
    rspWorkLocation: [],
    editingPos: {},
    error: false,
    message: '',
    isLoading: false,
    errors: {},
};

export const actionCreators = {
    getAllCodeByCodeType: codeType => async (dispatch) => {
        dispatch({ type: requestGetAllCode, codeType });

        let svc = new CodeService();
        svc.getAllCodeByCodeType(codeType).then(rsp => {
            //console.log(rsp);
            let item = {
                displayAs: "-- Please select --"
            }
            if (rsp.success) {
                rsp.data.jobLevel.unshift(item);
                rsp.data.jobCate.unshift(item);
                rsp.data.depart.unshift(item);
                rsp.data.salaryType.unshift(item);
                rsp.data.positionType.unshift(item);
                rsp.data.lang.unshift(item);
                rsp.data.worklocation.unshift(item);

                dispatch({
                    type: receiveGetAllCode,
                    rspJobLevel: rsp.data.jobLevel,
                    rspJobCate: rsp.data.jobCate,
                    rspDepart: rsp.data.depart,
                    rspSalType: rsp.data.salaryType,
                    rspPosType: rsp.data.positionType,
                    rspPrefLanguage: rsp.data.lang,
                    rspWorkLocation: rsp.data.worklocation
                });
            }
            else {
                dispatch({
                    type: errorType,
                    codeType,
                    rspJobLevel: [],
                    rspJobCate: [],
                    rspDepart: [],
                    rspSalType: [],
                    rspPosType: [],
                    rspPrefLanguage: [],
                    rspWorkLocation: [],
                    message: 'Error connection to Server!'
                });
            }
        });
    },
    searchPositionByKeyword: keyword => async (dispatch) => {
        let t = {
            keyword: keyword
        };
        dispatch({ type: requestSearchType, keyword: t });

        let svc = new PositionService();
        svc.readByKeyWord(t).then(rsp => {
            //console.log(rsp);
            if (rsp.success) {
                dispatch({
                    type: receiveSearchType,
                    rsp: rsp.data
                });
            }
            else {
                dispatch({
                    type: errorType, keyword,
                    rsp: [],
                    message: 'Error connection to Server!'
                });
            }
        });
    },
    createNewPosition: nPos => async (dispatch) => {
        //console.log(newPos);
        let obj = {
            positionName: nPos.txtName,
            jobDescription: nPos.txtDesc,
            jobLevel: nPos.jobLevel,
            jobRequirement: nPos.txtReq,
            departmentId: nPos.departmentId,
            jobCategory: nPos.jobCate,
            workLocation: nPos.workLocation,
            salaryType: nPos.salType,
            preferLang: nPos.preLang,
            positionType: nPos.posType,
        }

        dispatch({ type: requestCreateType, newPos: obj });

        let svc = new PositionService();
        svc.create(obj).then(res => {
            //console.log(res);
            if (res.success) {
                dispatch({ type: receiveCreateType, newPos: res.data, message: "" });
            }
            else {
                if (res.message === 'Exists data') {
                    dispatch({ type: receiveCreateType, newPos: res.data, message: res.message });
                }
                else {
                    dispatch({ type: errorType, message: 'Error connection to Server!' });
                }
            }
        });
    },
    saveNewPosition: nPos => async (dispatch) => {
        let obj = {
            id: nPos.id,
            positionName: nPos.txtName,
            jobDescription: nPos.txtDesc,
            jobLevel: nPos.jobLevel,
            jobRequirement: nPos.txtReq,
            departmentId: nPos.departmentId,
            jobCategory: nPos.jobCate,
            workLocation: nPos.workLocation,
            salaryType: nPos.salType,
            preferLang: nPos.preLang,
            positionType: nPos.posType,
        }

        dispatch({ type: requestCreateType, newPos: obj });
        //console.log('obj', obj);

        let svc = new PositionService();
        svc.update(obj).then(res => {
            //console.log(res);
            if (res.success) {
                dispatch({ type: receiveSaveType, editingPos: res.data, message: "" });
            }
            else {
                if (res.message !== '') {
                    dispatch({ type: receiveSaveType, editingPos: res.data, message: res.message });
                }
                else {
                    dispatch({ type: errorType, message: 'Error connection to Server!' });
                }
            }
        });

    },
    deletePos: did => async (dispatch) => {
        let t = {
            id: did,
        };

        dispatch({ type: requestDeleteType });

        let svc = new PositionService();
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
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    //Get All Code by Code Type
    if (action.type === requestGetAllCode) {
        return {
            ...state,
            codeType: action.codeType,
            isLoading: true
        };
    }

    if (action.type === receiveGetAllCode) {
        return {
            ...state,
            rspJobLevel: action.rspJobLevel,
            rspJobCate: action.rspJobCate,
            rspDepart: action.rspDepart,
            rspSalType: action.rspSalType,
            rspPosType: action.rspPosType,
            rspPrefLanguage: action.rspPrefLanguage,
            rspWorkLocation: action.rspWorkLocation,
            codeType: action.codeType,
            message: action.error,
            isLoading: false
        };
    }


    //Search position by key word
    if (action.type === requestSearchType) {
        return {
            ...state,
            keyword: action.keyword,
            isLoading: true
        };
    }

    if (action.type === receiveSearchType) {
        return {
            ...state,
            rsp: action.rsp,
            isLoading: false
        };
    }

    // Create
    if (action.type === requestCreateType) {
        return {
            ...state,
            newPos: action.newPos,
            isLoading: true
        };
    }

    if (action.type === receiveCreateType) {
        let arr = state.rsp;
        if (action.message === '') {
            let arr = state.rsp;
            arr.push(action.newPos);
        }
        //console.log(arr);
        return {
            ...state,
            newPos: action.newPos,
            rsp: arr,
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
            let id = action.editingPos.id;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === id) {
                    arr[i] = action.editingPos;
                    break;
                }
            }
        }
        return {
            ...state,
            rsp: arr,
            editingPos: action.editingPos,
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


    ///
    if (action.type === errorType) {
        return {
            ...state,
            newPos: {},
            error: true,
            message: action.message,
            isLoading: false
        };
    }

    return state;
};