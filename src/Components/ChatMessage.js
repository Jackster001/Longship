import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChatMessage extends Component{
    constructor(props){
        super(props);
        this.state={
          name:"",
          message:""
        }
    }

    render(){
        return (
            <div>
                {this.props.user.id === this.props.id ?
                <div className="UserMessageContainer">
                    <div className="chatBoxUserIconRight">
                        <img className="RightCurrentMessageImage" src="https://static.thenounproject.com/png/538846-200.png"/>
                    </div>
                    
                    <div className="messageRight"><p className="messageTextRight">{this.props.message}</p></div>
                </div>
                :
                <div className="UserMessageContainer">
                    <div className="chatBoxUserIconLeft">
                        <img className="LeftCurrentMessageImage" src="https://static.thenounproject.com/png/538846-200.png"/>
                    </div>
                    <div className="messageLeft"><p className="messageTextLeft">{this.props.message}</p></div>
                </div>
                }
            </div>
        )
    }
}
const mapStateToProps =(state) =>({
    user: state.authState.user,
    friends: state.profileState.profile.friendsList,
    profileLoading: state.profileState.profileLoading,
})
export default connect(mapStateToProps)(ChatMessage);