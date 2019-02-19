import { UserService } from '../../services';
import isEmpty from 'lodash/isEmpty';

const loadNoti = 'LOADING_NOTI';

const initialState = {
    subject: '',
    isLoading: false
};

export const actionCreators = {
    handleLoadNoti: () => dispatch => {     
        dispatch({ type: loadNoti, isLoading: true });
    },

    // handleClick: () => {
    //     dispatch({ type: loadNoti, isLoading: true });
    // },
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case loadNoti:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};