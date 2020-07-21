import React, { Component } from 'react';
import {connect} from 'react-redux';
import {findUsers, foundUsers} from '../Action/userAction'
import UserCard from '../Components/UserCard'
class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            users:[]

        }
    }
    componentDidUpdate(){
        if(this.props.findingUsers){
            this.props.foundUsers()
            this.setState({users: this.props.users})
        }
    }
    handleInputChange = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    onSubmit =(e)=>{
        e.preventDefault();
        this.props.findUsers(this.state.name, this.props.user.id);
    }
    render() {
        return (
        <div>
            <h1>Connect with Friends and Loved Ones</h1>
            <form onSubmit={(e)=>this.onSubmit(e)}>
                <input 
                    type='name'
                    name='name'
                    placeholder='Find Anyone ...'
                    onChange={(e)=>this.handleInputChange(e)}
                />
                <button>Search</button>
            </form>
            {this.state.users.map((user,i)=>{return (<UserCard key={i} user={user}/>)})}
        </div>
        );
    }
}
const mapStateToProps =(state) =>({
    user: state.authState.user,
    auth: state.usersState.auth,
    users: state.usersState.users,
    findingUsers: state.usersState.findingUsers,
    message: state.profileState.message
})

export default connect(mapStateToProps, {findUsers, foundUsers})(Connect);