import React from 'react';

class FriendList extends React.Component {

  state= {
    users:[]
  }


componentDidMount(){
  this.fetchUsers()
}
fetchUsers(){
  fetch('https://lemon-town-api.herokuapp.com/users')
  .then(r=>r.json())
  .then(r=>this.setState({
    users:{...this.state.users, r}
  }))
}

render(){
  return (
      <div>
        user list
      </div>
    );
  }
}
export default FriendList
