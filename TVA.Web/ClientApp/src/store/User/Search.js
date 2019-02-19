/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 02/02/2019 14:46
 * Update       : 03/02/2019 12:03
 * Checklist    : 1.0
 * Status       : OK
 */

import { UserService } from '../../services';
import isEmpty from 'lodash/isEmpty';

const inputType = 'INPUT_USER_SEARCH';
const submitType = 'SUBMIT_USER_SEARCH';
const requestType = 'REQUEST_USER_SEARCH';
const receiveType = 'RECEIVE_USER_SEARCH';
const initialState = {
    pin: '',
    email: '',
    userName: '',
    rsp: { data: [] },
    message: null,
    errors: {},
    isLoading: false
};

export const actionCreators = {
    handleInput: event => ({
        type: inputType,
        name: event.target.name,
        value: event.target.value
    }),

    handleSubmit: event => async (dispatch, getState) => {
        event.preventDefault();

        let state = getState().userSearch;
        let errors = validateInput(state);

        if (Object.keys(errors).length > 0) {
            dispatch({ type: submitType, errors });
            return;
        }

        dispatch({ type: submitType, errors, isLoading: true });

        let page = 1;
        let t = {
            page: page,
            size: 10,
            sort: [
                {
                    field: 'Email',
                    direction: 'DESC'
                }
            ],
            filter: {
                pin: '',
                email: '',
                userName: ''
            }
        };

        let svc = new UserService();
        svc.read(t).then(rsp => {
            if (rsp.success) {
                dispatch({ type: submitType, page, rsp });
            }
        });
    },

    requestTable: page => async (dispatch, getState) => {
        let state = getState().userSearch;

        // Don't issue a duplicate request (we already have or are loading the requested data)
        if (page === state.page) {
            return;
        }

        dispatch({ type: requestType, page });

        let t = {
            page: page,
            size: 10,
            sort: [
                {
                    field: 'Email',
                    direction: 'DESC'
                }
            ],
            filter: {
                pin: '',
                email: '',
                userName: ''
            }
        };

        let svc = new UserService();
        svc.read(t).then(rsp => {
            if (rsp.success) {
                dispatch({ type: receiveType, page, rsp });
            }
        });
    }
};

const validateInput = (state) => {
    var res = {};

    if (isEmpty(state.userName)) {
        res.userName = 'Please enter user name or email.';
    }
    else if (state.userName.length > 64) {
        res.userName = 'Maximum length is 64 characters.';
    }
    return res;
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestType) {
        return {
            ...state,
            page: action.page,
            isLoading: true
        };
    }

    if (action.type === receiveType) {
        return {
            ...state,
            page: action.page,
            rsp: action.rsp,
            isLoading: false
        };
    }

    return state;
};