import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loginUser } from '../Action/sessionAction';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    componentDidMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push('/home');
      }
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.isAuthenticated) {
        this.props.history.push('/home');
      }
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    onSubmit(event){
      event.preventDefault();
  
      const userData={
        email:this.state.email,
        password:this.state.password
      };
      this.props.loginUser(userData)
    }

    render() {
        return (
            <div className="signInForm">
                <div className="topForm">
                    <center><h2>Login</h2></center>
                </div>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <input 
                        type="email"
                        name='email'
                        placeholder="Email"
                        onChange={this.handleInputChange}
                        required
                    />
                    <input 
                        type='password'
                        name='password'
                        placeholder="Password"
                        onChange={this.handleInputChange}
                        required
                    />
                    <center><button className='submitButton'>Login</button></center>
                </form>
                <center>
                <br/><br/>
                <p>Don't have an account? Sign Up</p></center>
            </div>
        );
    }
}

const mapStateToProps =(state) =>({
  isAuthenticated: state.authState.isAuthenticated,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);
