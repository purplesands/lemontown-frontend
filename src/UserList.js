import React from 'react';
import UserCard from './UserCard';
import { url } from './helpers';

class UserList extends React.Component {

  state= {
    users:[],
    search: ''
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
    fetch(`${url}/users`)
    .then(r=>r.json())
    .then(r=>{
      this.setState({
      users:r
    })})
  }

  handleSearch = (e) => {
    debugger
    this.setState({
      search: e.target.value
    })
  }

  filterUsers(){
    return this.state.users.filter(user => user.username.includes(this.state.search))
  }

  render(){
    return (

        <div className="userList">
        <input className="userSearch" type="text" value={this.state.search} onChange={(e)=>this.handleSearch(e)} ></input>
        <input className="userSearch" type="text" value={this.state.search} onChange={(e)=>this.handleSearch(e)} ></input>
        <input className="userSearch" type="text" value={this.state.search} onChange={(e)=>this.handleSearch(e)} ></input>
        <input className="userSearch" type="text" value={this.state.search} placeholder="search" onChange={(e)=>this.handleSearch(e)} ></input>


          {this.renderList(this.filterUsers())}
        </div>
      );
    }
}
export default UserList
