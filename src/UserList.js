import React from 'react';
import UserCard from './UserCard';

class UserList extends React.Component {

  state= {
    users:[]
  }

renderList=(arr)=>{
  return arr.map(user=>{
  return <UserCard {...user} handleFollow={this.props.handleFollow} handleUnfollow={this.props.handleUnfollow}/>
  })
}

componentDidMount(){
  this.fetchUsers()
}
fetchUsers(){
  fetch('http://localhost:3000/users')
  .then(r=>r.json())
  .then(r=>{
    this.setState({
    users:r
  })})
}

cool=()=>{
  debugger
}

render(){
  return (
      <div className="userList">
        {this.renderList(this.state.users)}
      </div>
    );
  }
}
export default UserList
