import { Token } from './../utilities';
import { UserService } from './../services';

const signOutType = 'SIGN_OUT';
const resetGoOutType = 'RESET_GO_OUT';
const getUsername = 'GET_USERNAME';

const initialState = {
    isLoading: false,
    goOut: false,
    currentUsername:''
};

export const actionCreators = {
    handleResetGoOut: () => ({ type: signOutType }),
    handleSignOut: event => async (dispatch) => {
        event.preventDefault();
        Token.remove();
        dispatch({ type: signOutType, goOut: true });
    },
    getUsername: () => async (dispatch)  => {       
        var uid = getCurrentUsername();
        //console.log(uid);
        dispatch({type: getUsername, userName: uid});
    }
};

function getCurrentUsername()
{    
    return "test";
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case resetGoOutType:
            return {
                ...state,
                goOut: false
            };
        case signOutType:
            return {
                ...state,
                isLoading: action.isLoading,
                goOut: action.goOut
            }
        case getUsername:
            return {
                ...state,
                currentUsername: action.userName
            };
        default: return state;
    }
};