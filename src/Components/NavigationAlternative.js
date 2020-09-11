import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as routes from '../Routes/routes';
import { connect } from 'react-redux';
import { logoutUser } from '../Action/sessionAction';
import { FriendBox, FriendList } from '../Components/index'
import { FaHome, FaUserFriends, FaBell } from 'react-icons/fa';
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from 'react-icons/io'

class NavigationAlternative extends Component{
    constructor(props){
        super(props)
        this.state={
            navigationType:"navigation"
        }
    }
    authLinks(){
        return(
        <div className="navBar">
            <div className="dropContainer">
                <IoIosArrowDropleftCircle className="collapseIcon" size="25" onClick={()=>this.toggleNavigation()}/>
            </div>
            <center>
                <img className="navigationProfileImage" src="https://static.thenounproject.com/png/538846-200.png"/>
                <Link to={routes.PROFILE}><button className="editProfileButton">Edit Profile</button></Link>
            </center>
            <ul className='navigationList'>
                <li><Link className='links' to={routes.HOME}><FaHome className="iconsStyle"/>Home</Link></li>
                {/* <li><Link className='links' to={routes.CHATROOM}>Chat</Link></li> */}
                <li><Link className='links' to={routes.SHIPS}><FaUserFriends className="iconsStyle"/>Friends</Link></li>
                {/* <li><Link className='links' to={routes.CONNECT}>Connect</Link></li> */}
                <li><Link className='links' to={routes.REQUESTS}><FaBell className="iconsStyle"/>Notifications</Link></li>
            </ul>
            <FriendBox />
            {/* <button className="signOutButton" onClick={()=>this.props.logoutUser()}>Sign Out</button> */}
        </div>
        )
    }
    collapsedAuthLinks(){
        return(
        <div className="collapsedNavbar">
            <div className="collapsedDropContainer">
                <IoIosArrowDroprightCircle className="collapseIcon" size="25" onClick={()=>this.toggleNavigation()}/>
            </div>
            <ul className='collapseNavigationList'>
                {/* <li><Link className='links' to={routes.HOME}><FaHome className="iconsStyle"/>Home</Link></li>
                <li><Link className='links' to={routes.SHIPS}><FaUserFriends className="iconsStyle"/>Friends</Link></li>
                <li><Link className='links' to={routes.REQUESTS}><FaBell className="iconsStyle"/>Notifications</Link></li> */}
            </ul>
        </div>
        )
    }
    toggleNavigation(){
        if(this.state.navigationType === "navigation"){
            this.setState({navigationType:"collapsedNavigation"})
        }else{
            this.setState({navigationType:"navigation"})
        }
    }
    render(){
        return (
            <div>
                {this.props.isAuthenticated?
                    <div className={this.state.navigationType}>
                        {this.state.navigationType === "navigation" ? this.authLinks() : this.collapsedAuthLinks()}
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
  
export default connect(mapStateToProps, {logoutUser})(NavigationAlternative);
  

