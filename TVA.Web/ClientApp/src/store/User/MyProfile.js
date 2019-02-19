/*
 * Author       : Thu Phan
 * Email        : 
 * Phone        : 
 * ------------------------------- *
 * Create       : 12/02/2019 14:46
 * Update       : 12/02/2019 14:46
 * Checklist    : 1.0
 * Status       : 
 */

import { Token } from '../../utilities';
import { UserService } from '../../services';
import isEmpty from 'lodash/isEmpty';

const inputType = 'INPUT_MY_PROFILE';
const readProfile = 'READ_MY_PROFILE';
const requestSaveType = 'REQUEST_SAVE_MY_PROFILE';
const receiveSaveType = 'RECEIVE_SAVE_MY_PROFILE';

const initialState = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    rsp: [],
    message: null,
    errors: {},
    isLoading: false,
    editingProfile: [],
    newUser: {}
};

export const actionCreators = {
    handleInput: (event) => ({
            type: inputType,
            name: event.target.name,
            value: event.target.value
    }),

    readProfile: () => async (dispatch) => {
        let usr = Token.getInfo().user;
        //console.log(usr);
        let userId = usr.Id;
        let body = {
            id: userId
        }

        let svc = new UserService();
        svc.readProfile(body).then(rsp => {
            //console.log(rsp);
            if (rsp.success) {
                dispatch({ type: readProfile, rsp: rsp.data });
            }
            else {
                dispatch({ type: readProfile, rsp: [], message: 'Error connection to Server!' });
            }
        }
        )
    },

    handleUpdate: newUser => async (dispatch) => {
        let t = {
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone
        };
        dispatch({ type: requestSaveType, newUser: t });

        let svc = new UserService();
        svc.update(t).then(res => {
            console.log(res);
            if (res.success) {
                dispatch({ type: receiveSaveType, editingProfile: res.data, message: "" });
            }
            else {
                if (res.message !== '') {
                    dispatch({ type: receiveSaveType, editingProfile: res.data, message: res.message });
                }
                else {
                    dispatch({ type: receiveSaveType, message: 'Error connection to Server!' });
                }
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
        case readProfile:
            return {
                ...state,
                isLoading: action.isLoading,
                rsp: action.rsp,
                userName: action.rsp.userName,
                email: action.rsp.email,
                firstName: action.rsp.firstName,
                lastName: action.rsp.lastName,
                phone: action.rsp.phone,
                birthday: action.rsp.birthday
            };
        case requestSaveType:
            return {
                ...state,
                isLoading: true
            };
        case receiveSaveType:
            let arr = state.rsp;
            if (action.message === '') {
                let id = action.editingProfile.id;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === id) {
                        arr[i] = action.editingProfile;
                        break;
                    }
                }
            }
            return {
                ...state,
                rsp: arr,
                editingDay: action.editingProfile,
                message: action.message,
                isLoading: false
            };
        default:
            return state;
    }
};