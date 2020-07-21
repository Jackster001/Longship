import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openMessageBox} from '../Action/profileAction'
class FriendItem extends Component{
    constructor(props){
        super(props)
        this.state={
            showChatApp:false
        }
    }
    render(){
        return (
        <div className="friendItem">
            <div className="friendItemRow">
            <img src="https://static.thenounproject.com/png/538846-200.png"/>
            <div className="friendItemRightSection">
                <center><h4 className="NameTexts">{`${this.props.firstName} ${this.props.lastName}`}</h4></center>
                <button className="friendItemButtons" onClick={()=>this.props.openMessageBox(this.props.currentUser.id, this.props.id)}>Message</button>
                </div>
            </div>
        </div>
        )
    }

}
const mapStateToProps =(state) =>({
    currentUser: state.authState.user
})
export default connect(mapStateToProps, {openMessageBox})(FriendItem);