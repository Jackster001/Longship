import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProfile, setProfileLoading, acceptedRequest, acceptFriendRequest} from '../Action/profileAction';
import {RequestBox} from '../Components/index';

class Requests extends Component {
  constructor(props){
    super(props);
    this.state={
      friendRequests:[]
    }
  }
  componentDidMount(){
    this.props.getProfile(this.props.user.id)
  }
  componentDidUpdate(){
    if(this.props.profileLoading){
      this.props.setProfileLoading()
      this.setState({...this.state,friendRequests: this.props.profile.friendRequestList})
    }
  }
  render() {
    return (
      <div className="requestTable">
        {this.state.friendRequests && this.state.friendRequests.map(request=>{
          return  <RequestBox 
                    id={request._id}
                    firstName={request.firstName}
                    lastName={request.lastName}
                  />
        })}
      </div>
    );
  }
}
const mapStateToProps =(state) =>({
  user: state.authState.user,
  profile: state.profileState.profile,
  profileLoading: state.profileState.profileLoading,
})

export default connect(mapStateToProps, {getProfile, setProfileLoading})(Requests);