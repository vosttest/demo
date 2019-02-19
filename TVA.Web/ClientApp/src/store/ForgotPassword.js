import isEmpty from 'lodash/isEmpty';

const inputForgotPasswordType = 'INPUT_FORGOT_PASSWORD';
const submitForgotPasswordType = 'SUBMIT_FORGOT_PASSWORD';

const initialState = {
    username: '',
    errors: {},
    isLoading: false,
    message: null
};

export const actionCreators = {
    handleInput: event => ({
        type: inputForgotPasswordType,
        name: event.target.name,
        value: event.target.value
    }),

    handleSubmit: event => async (dispatch, getState) => {
        event.preventDefault();

        const state = getState().forgotPassword;
        const errors = validateInput(state);

        if (Object.keys(errors).length > 0) {
            dispatch({ type: submitForgotPasswordType, errors });
            return;
        }

        dispatch({ type: submitForgotPasswordType, errors, isLoading: true });
    }
};

const validateInput = (state) => {
    var errors = {};

    if (isEmpty(state.username))
        errors.username = 'Please enter user name or email.';

    return errors;
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case inputForgotPasswordType:
            return {
                ...state,
                [action.name]: action.value
            };
        case submitForgotPasswordType:
            return {
                ...state,
                errors: { ...action.errors },
                isLoading: action.isLoading
            };
        default: return state;
    }
};