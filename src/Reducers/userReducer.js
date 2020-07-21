import isEmpty from '../validation/is-empty';

const initialState = {
    users: [],
    findingUsers: false
}

export default function(state= initialState, action){
    switch(action.type){
        case "FOUND_USERS":
            return{
                ...state,
                users: action.payload,
                findingUsers:true
            }
        case "FINDING_USERS":
            return{
                ...state,
                findingUsers:false
            };
        default:
            return state;
    }

}