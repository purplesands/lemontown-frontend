import React from 'react';
import { url } from './helpers';


class FriendList extends React.Component {

  state= {
    users:[]
  }

componentDidMount(){
  this.fetchUsers()
}

fetchUsers(){
  fetch(`${url}/users`)
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
