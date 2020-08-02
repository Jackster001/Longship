import React, { Component } from 'react';
import {connect} from 'react-redux';
class Profile extends Component {
  render() {
    return (
      <div className="profileContainer">
        <center><h1>Profile Screen</h1></center>
        <div className="profileTop">
          <div className="profileImage">
            <img className="profileImageSrc" src="https://static.thenounproject.com/png/538846-200.png"/>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps =(state) =>({
    profile: state.profileState.profile
})

export default connect(mapStateToProps)(Profile);