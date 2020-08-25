import axios from 'axios';
const server = "https://blooming-temple-81335.herokuapp.com";
const dev= "http://localhost:8080";


export const getProfile = (id) => async (dispatch)=> {
    try{
        const profile= await axios.get(`${server}/api/profile/${id}`, 
        {headers:{'Authorization':localStorage.jwtToken}});
        // const profile= await axios.get(`/api/profile/${id}`);
        await dispatch({
            type:'GET_PROFILE',
            payload: profile.data
        })
    }catch(err){
        throw err
    }
}

// Profile loading
export const setProfileLoading = () => {
    return {
      type: "PROFILE_LOADING"
    };
};

// Sending friend request
export const sendFriendRequest = (requested) => async (dispatch)=>{
    try{
        const responseMessage = await axios.post(`${server}/api/profile/send_request`, requested);
        dispatch({
            type: "SEND_REQUEST",
            payload: responseMessage
        })
    }catch(err){
        throw err
    }
}

// Accepting Friend Request
export const acceptFriendRequest = (currentID, requesterID) => async (dispatch)=>{
    try{
        await dispatch({
            type:'ACCEPTING_REQUEST'
        })
        const responseMessage = await axios.post(`${server}/api/profile/accept_request`, {currentID, requesterID}, {headers:{'Authorization':localStorage.jwtToken}});
        return {
            type: "ACCEPT_REQUEST",
            payload: responseMessage
        }
    }catch(err){
        throw err
    }
}

export const openMessageBox = (currentID, friendID) => async (dispatch)=>{
    try{
        const responseMessage = await axios.post(`${server}/api/profile/open_chat`, {currentID, friendID}, {headers:{'Authorization':localStorage.jwtToken}});
        return await dispatch({
            type:'OPEN_MESSAGE_BOX',
            payload: responseMessage.data
        })
    }catch(err){
        throw err
    }
}

export const closeMessageBox = () =>{
    return{
        type:"CLOSE_MESSAGE_BOX"
    }
}

export const requestSent = () =>{
    return{
        type:"SENT_REQUEST"
    }
}

export const acceptedRequest = () =>{
    return{
        type:"FINISH_REQUEST"
    }
}
