import React from "react";
import io from "socket.io-client";
import './index'
import picture from './valentines.jpg'
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('https://blooming-temple-81335.herokuapp.com');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
        
        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev =>{
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message: ''});
        }
    }

    render(){
        return (
            <div className="contain">
                <div  className="heading">
                    <div className="card-title">
                        <h2 className="title">Chat Room</h2>
                    </div>
                </div>
                
                <div className='body'>
                    <br/><br/><br/><br/><br/>
                    <div className='box'>
                        {/* <img className='imgg' src={picture} /> */}
                        {/* <div className='space'></div> */}
                        <div className='section chatSection'>
                                <div className="messages">
                                {this.state.messages.map(message => {
                                    return (
                                        <div>{message.author}: {message.message}</div>
                                    )
                                })}
                                </div><br/>
                                <input className="inputs" type="text" placeholder="Username" value={this.state.username} 
                                    onChange={ev=> this.setState({username: ev.target.value})}/>
                                <br/>

                                <input className="inputs" type="text" placeholder="Message" value={this.state.message} 
                                    onChange={ev => this.setState({message: ev.target.value})}/>
                                <center>
                                <button className="button" onClick={this.sendMessage}>Send</button>
                                </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;