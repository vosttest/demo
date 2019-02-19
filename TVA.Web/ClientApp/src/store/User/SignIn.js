/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 02/02/2019 14:46
 * Update       : 02/02/2019 14:46
 * Checklist    : 1.0
 * Status       : OK
 */

import { Token } from '../../utilities';
import { UserService } from '../../services';
import isEmpty from 'lodash/isEmpty';

const inputType = 'INPUT_SIGN_IN';
const submitType = 'SUBMIT_SIGN_IN';
const initialState = {
    userName: '',
    password: '',
    message: null,
    errors: {},
    isLoading: false,
    toHome: false
};

export const actionCreators = {
    handleInput: event => ({
        type: inputType,
        name: event.target.name,
        value: event.target.value
    }),

    handleSubmit: event => async (dispatch, getState) => {
        event.preventDefault();

        const state = getState().userSignIn;
        const errors = validateInput(state);

        if (Object.keys(errors).length > 0) {
            dispatch({ type: submitType, errors });
            return;
        }

        dispatch({ type: submitType, errors, isLoading: true });

        let svc = new UserService();
        svc.signIn(state).then(rsp => {
            if (rsp.success) {
                Token.set(rsp.data);
                dispatch({ type: submitType, toHome: true });
            }

            dispatch({ type: submitType, message: rsp.message, isLoading: false });
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

    if (isEmpty(state.password)) {
        res.password = 'Please enter password.';
    }

    return res;
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case inputType:
            return {
                ...state,
                [action.name]: action.value
            };

        case submitType:
            return {
                ...state,
                errors: { ...action.errors },
                isLoading: action.isLoading,
                message: action.message,
                toHome: action.toHome
            };

        default:
            return state;
    }
};