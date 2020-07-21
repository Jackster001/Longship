import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FriendItem} from '../Components/index'
import {getProfile, setProfileLoading} from '../Action/profileAction'

class Ships extends Component {
  constructor(props){
    super(props);
    this.state={
      friends:[]
    }
  }
  componentDidMount(){
    this.props.getProfile(this.props.user.id)
  }
  componentDidUpdate(){
    if(this.props.profileLoading){
      this.props.setProfileLoading()
      this.setState({...this.state,friends: this.props.friends})
      console.log(this.props.friends)
    }
  }
  render() {
    return (
      <div className="friendPage">
        <center><h1 className='pageTitle'>Your Friends</h1></center>
        <div className='friendContainer'>
          {/* {this.state.friends.map(friend=>{
            return <FriendBox key={friend.id} id={friend.id} firstName={friend.firstName} lastName={friend.lastName}/>
          })} */}
        </div>
      </div>
    );
  }
}
const mapStateToProps =(state) =>({
  user: state.authState.user,
  friends: state.profileState.profile.friendsList,
  profileLoading: state.profileState.profileLoading,
})

export default connect(mapStateToProps, {getProfile, setProfileLoading})(Ships);