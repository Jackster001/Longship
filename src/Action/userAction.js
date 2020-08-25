import axios from 'axios';
const server = "https://blooming-temple-81335.herokuapp.com";
const dev= "http://localhost:8080";

export const findUsers = (name, id)=> async dispatch=>{
    try{
        const users = await axios.post(`${server}/api/users/findusers`, {name, id});
        dispatch({
            type: "FOUND_USERS",
            payload: users.data
        })
    }catch(err){
        dispatch({
            type: "FOUND_ERRORS",
        })
    }
}

export const foundUsers = dispatch =>{
    return {
        type: "FINDING_USERS",
        payload: false
    }
}