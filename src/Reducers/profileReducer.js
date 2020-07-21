const initialState = {
    profile: {},
    profileLoading:false,
    message:"",
    messageHistory: [],
    messageRecieving: false,
    openMessageBox: false.message,
    roomID: null,
    friendName: null,
}

export default function(state= initialState, action){
    switch(action.type){
        case "GET_PROFILE":
            return{
                ...state,
                profile: action.payload,
                profileLoading:true,
                messageRecieving:true
            };
        case "PROFILE_LOADING":
            return{
                ...state,
                profileLoading:false
            };
        case "SEND_REQUEST":
            return{
                ...state,
                message:action.payload,
                messageRecieving:true
            };
        case "SENT_REQUEST":
            return{
                ...state,
                messageRecieving:false
            }
        case "ACCEPT_REQUEST":
            return{
                ...state, 
                message: action.payload
            }
        case "ACCEPTING_REQUEST":
            return{
                ...state,
                messageRecieving:true
            }
        case "OPEN_MESSAGE_BOX":
            return{
                ...state,
                messageHistory: action.payload.chatHistory,
                roomID: action.payload.roomID,
                friendName: action.payload.name
            }
        case "CLOSE_MESSAGE_BOX":
            return{
                ...state,
                messageHistory: [],
                roomID: null,
                friendName: null,
            }
        case "FINISH_REQUEST":
            return{
                ...state,
                messageRecieving:false
            }
        default:
            return state;
    }

}