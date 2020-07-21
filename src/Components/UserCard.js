import React, {useEffect} from 'react';
import {sendFriendRequest, requestSent} from '../Action/profileAction'
import {connect} from 'react-redux';

const UserCard =(props)=>{

    const {_id,firstName,lastName} = props.user
    
    useEffect(()=>{
        console.log(props.currentUser)
        if(props.messageRecieving){
            props.requestSent();
        }
    })

    return (
        <div className="userCard">
            <center><img src="https://static.thenounproject.com/png/538846-200.png"/>
                <h3>{`${firstName} ${lastName}`}</h3>
                <button onClick={()=>props.sendFriendRequest({
                        _id,firstName,lastName,
                        currentID: props.currentUser.id,
                        currentFirstName: props.currentUser.firstName,
                        currentLastName: props.currentUser.lastName
                    })}>
                    Send Friend Request
                </button>
            </center>
        </div>
    )
}
const mapStateToProps =(state) =>({
    currentUser: state.authState.user,
    message: state.profileState.message,
    messageRecieving: state.profileState.messageRecieving
})
export default connect(mapStateToProps,{sendFriendRequest, requestSent})(UserCard);
