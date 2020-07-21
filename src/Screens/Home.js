import React, { Component } from 'react';
import {connect} from 'react-redux';
class Home extends Component {
  render() {
    return (
      <div>
        <center><h1 className='helo'>Home Screen</h1></center>
      </div>
    );
  }
}
const mapStateToProps =(state) =>({
})

export default connect(mapStateToProps)(Home);