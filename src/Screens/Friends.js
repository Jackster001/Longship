import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FriendItem, FriendBox, RequestBox} from '../Components/index'
import {getProfile, setProfileLoading} from '../Action/profileAction'

class Ships extends Component {
  constructor(props){
    super(props);
    this.state={
      friends:[],
      friendRequests:[],
      toggle:"your-friends"
    }
  }
  componentDidMount(){
    this.props.getProfile(this.props.user.id)
  }
  componentDidUpdate(){
    if(this.props.profileLoading){
      this.props.setProfileLoading()
      this.setState({...this.state,friends: this.props.friends})
    }
  }
  myFriendsContainer(){
    return(
      <div>
        <h1>friends</h1>
        {this.state.friends.map(friend=>{
          return <FriendBox key={friend.id} id={friend.id} 
                  firstName={friend.firstName} 
                  lastName={friend.lastName}/>
        })}
      </div>
    )
  }
  requestFriendContainer(){
    return(
      <div>
        <h1>requests</h1>
      {this.state.friendRequests && this.state.friendRequests.map(request=>{
        return  <RequestBox 
                  id={request._id}
                  firstName={request.firstName}
                  lastName={request.lastName}
                />
      })}</div>
    )
  }
  addingFriendContainer(){
    return(
      <div>
        <h1>add friends</h1>
        {this.state.friendRequests && this.state.friendRequests.map(request=>{
          return  <RequestBox 
                    id={request._id}
                    firstName={request.firstName}
                    lastName={request.lastName}
                  />
        })}
      </div>
    )
  }
  render() {
    return (
      <div className="friendPage">
        <center><h1 className='pageTitle'>Your Friends</h1></center>
        <div className='friendContainer'>
          <div className="friendSearchTopContainer">
            <div className="friendTitleContainer">
              <h2 className="friendToggleTitle" onClick={()=>this.setState({toggle:"your-friends"})}>Your Friends</h2>
            </div>
            <div className="friendTitleContainer">
              <h2 className="friendToggleTitle" onClick={()=>this.setState({toggle:"add-friends"})}>Add Friend</h2>
            </div>
            <div className="friendTitleContainer">
              <h2 className="friendToggleTitle" onClick={()=>this.setState({toggle:"requests"})}>Requests</h2>
            </div>
            <div className="friendSearchContainer">
              <div class="wrapSearch">
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="Search..."/>
                    <button type="submit" class="searchButton">
                      Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          {this.state.toggle === "your-friends" ? this.myFriendsContainer() 
            : this.state.toggle === "add-friends" ? this.addingFriendContainer()
            : this.requestFriendContainer()
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps =(state) =>({
  user: state.authState.user,
  friends: state.profileState.profile.friendsList,
  profile: state.profileState.profile,
  profileLoading: state.profileState.profileLoading,
})

export default connect(mapStateToProps, {getProfile, setProfileLoading})(Ships);