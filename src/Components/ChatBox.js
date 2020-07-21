import React from "react";
import io from "socket.io-client";
import './index'
import {connect} from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import {closeMessageBox} from '../Action/profileAction';
import ChatMessage from './ChatMessage';


class ChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUserName: '',
            message: '',
            messageHistory: [],
            chatRoom: this.props.roomID,
            showChatBox: false,
            friendName:'',
            newMessage:false
        };
       
        this.socket = io(`http://localhost:8080/chatrooms`);

        this.socket.on('connect', function(){
            console.log("connected")
        })     
        
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data)
        }) 

        this.sendMessage = ev =>{
            console.log(this.state.message)
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                id: this.props.user.id,
                name: `${this.props.user.firstName} ${this.props.user.lastName}`,
                message: this.state.message
            });
            this.setState({message: ''});      
        }
        const addMessage = data =>{
            this.setState({messageHistory: [...this.state.messageHistory, data]});
            console.log(this.state.messageHistory);
        };
    }
    componentDidMount(){
        if(this.props.roomID){
            this.setState({...this.state, chatRoom:this.props.roomID, })
        }
    }
    componentDidUpdate(){
        if(this.props.roomID!= this.state.chatRoom){
            this.setState({
                ...this.state,
                chatRoom: this.props.roomID,
                messageHistory: this.props.messageHistory,
                friendName: this.props.friendName,
            })
            this.socket.emit("joinroom", {roomID: this.props.roomID})   
            console.log(this.props.roomID)
        }
    }
    // addMessage (data){
    //     this.setState({...this.state, messageHistory: [...this.state.messageHistory, data]});
    //     console.log(this.state.messageHistory);
    // };


    render(){
        return (
            <div>
                {this.props.isAuthenticated && this.props.roomID? 
                    <div className="chatBox">
                        <div className="chatHeader">
                            <h2>{this.state.friendName}</h2>
                            <IoIosCloseCircleOutline className="closeIcon" onClick={()=>this.props.closeMessageBox()}/>
                        </div>
                        <div className="messageBox">
                            {this.props.roomID ? this.state.messageHistory.map((messageObject, i)=>{
                                return <ChatMessage id={messageObject.id} message={messageObject.message}/>                                
                            }):<div></div>}
                        </div>
                        <div className="chatInputContainer">
                            <input className="chatInput" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                            <button className="chatSend" onClick={(ev)=>this.sendMessage(ev)}>Send</button>
                        </div>
                    </div>
                :<div></div>}
            </div>
        );
    }
}

const mapStateToProps =(state) =>({
  user: state.authState.user,
  errors: state.errors,
  isAuthenticated: state.authState.isAuthenticated,
  roomID: state.profileState.roomID,
  messageHistory: state.profileState.messageHistory,
  friendName: state.profileState.friendName
})

export default connect(mapStateToProps, {closeMessageBox})(ChatBox);