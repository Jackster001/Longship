import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
const server = "https://blooming-temple-81335.herokuapp.com";

export const registerUser=  (userData, history)=> async dispatch=>{
    try{
        // const user = await axios.post('http://localhost:8080/api/users/register', userData)
        const user = await axios.post('https://blooming-temple-81335.herokuapp.com/api/users/register', userData)
        const profileInfo = {id: user.data._id, firstName: userData.firstName, lastName: userData.lastName}
        await axios.post('http://localhost:8080/api/profile/create', profileInfo)
        // await axios.post('https://blooming-temple-81335.herokuapp.com/api/profile/create', profileInfo)
        window.location.href = '/login';
    }catch(err){
        dispatch({
            type: "GET_ERRORS",
        })
    }
}

//login token
export const loginUser =(userData)=> dispatch =>{
    axios.post('https://blooming-temple-81335.herokuapp.com/api/users/login', userData)
    // axios.post('http://localhost:8080/api/users/login', userData)
    .then(res =>{
        //save to local storage
        const{token}= res.data;
        //set token to ls
        localStorage.setItem('jwtToken', token);
        //set token to auth header
        console.log(token)
        setAuthToken(token);
        //decode token to get user data
        const decoded =jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    }).catch(err=>{
        dispatch({
            type:"LOGIN_ERROR"
        })    
    });
};

//set logged in user
export const setCurrentUser=(decoded)=>{
    return{
        type:"SET_CURRENT_USER",
        payload: decoded

    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
  