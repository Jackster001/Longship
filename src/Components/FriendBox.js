import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import {FriendItem} from './';
import {getProfile, setProfileLoading} from '../Action/profileAction'
class FriendBox extends Component{
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
        }
      }
    render(){
        return (
            <div className="friendBox">
                <h3 className="friendBoxTitle">Friends <FaUserPlus className="userAddIcon"/></h3>
                <hr/>
                <div className="friendBoxScrollView">
                    {this.state.friends.map(friend=>{
                        return <FriendItem 
                            key={friend.id} 
                            id={friend.id} 
                            firstName={friend.firstName} 
                            lastName={friend.lastName}/>
                    })}
                </div>  
            </div>
        )
    }
}
const mapStateToProps =(state) =>({
    user: state.authState.user,
    friends: state.profileState.profile.friendsList,
    profileLoading: state.profileState.profileLoading,
})
export default connect(mapStateToProps, {getProfile, setProfileLoading})(FriendBox);