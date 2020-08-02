import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    token: "",
    loginError:false
}

export default function(state= initialState, action){
    switch(action.type){
        case "SET_CURRENT_USER":
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loginError:false
            }
        case "LOGIN_ERROR":
            return{
                ...state,
                loginError:true
            }
        default:
            return state;
    }

}