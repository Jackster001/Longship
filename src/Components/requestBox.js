import React from 'react';
import {connect} from 'react-redux';
import {acceptFriendRequest} from '../Action/profileAction'

const RequestBox =(props)=>{
    return (
        <div className="requestCard">
            <center><img src="https://static.thenounproject.com/png/538846-200.png"/>
            <h3>{`${props.firstName} ${props.lastName}`}</h3>
            <button onClick={()=>props.acceptFriendRequest(props.currentUser.id, props.id)}>Accept Friend Request</button></center>
        </div>
    )
}
const mapStateToProps =(state) =>({
    currentUser: state.authState.user,
})
export default connect(mapStateToProps,{acceptFriendRequest})(RequestBox);