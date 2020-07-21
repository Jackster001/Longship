import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as routes from '../Routes/routes';
import { connect } from 'react-redux';
import { logoutUser } from '../Action/sessionAction';
import { FriendBox, FriendList } from '../Components/index'

class Navigation extends Component{
    constructor(props){
        super(props)

    }
    authLinks(){
        return(
        <div className="navBar">
            <center>
                <img className="navigationProfileImage" src="https://static.thenounproject.com/png/538846-200.png"/>
                <Link to={routes.PROFILE}><button class="editProfileButton">Edit Profile</button></Link>
            </center>
            <ul className='navigationList'>
                <li><Link className='links' to={routes.HOME}>Home</Link></li>
                <li><Link className='links' to={routes.CHATROOM}>Chat</Link></li>
                <li><Link className='links' to={routes.SHIPS}>Friends</Link></li>
                <li><Link className='links' to={routes.CONNECT}>Connect</Link></li>
                <li><Link className='links' to={routes.REQUESTS}>Requests</Link></li>
            </ul>
            <FriendBox />
            <button className="signOutButton" onClick={()=>this.props.logoutUser()}>Sign Out</button>
        </div>
        )
    }
    render(){
        return (
            <div>
                {this.props.isAuthenticated?
                    <div className="navigation">
                        {this.props.isAuthenticated ? this.authLinks() : this.nonAuthLinks()}
                    </div>
                    :[]
                }
            </div>
        );
    }


}


const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated
})
  
export default connect(mapStateToProps, {logoutUser})(Navigation);
  

