import React from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';


class FriendFeed extends React.Component {

  state={
    friends:[],
    entries:[],
    friendEntries:[]
  }

// fetchFriends=()=>{
//   fetch('http://localhost:3000/followings')
//   .then(r=>r.json())
//   .then(r=>{this.setState({
//     friends: this.filterFriends(r)
//   })})
// }
//
// filterFriends=(arr)=>{
//   return arr.filter(friend=>{
//     return friend.user_id === this.props.currentUser.id
//   })
// }

fetchEntries=()=>{
  fetch('http://localhost:3000/entries')
  .then(r=>r.json())
  .then(r=>{this.setState({
    entries: r
  },()=> this.setState({
    friendEntries: this.matchEntries(this.state.entries, this.props.followings)
    }))
  })
}

matchEntries = (entries, friends) => {
  let friendEntries = []
  for (var i = 0; i < friends.length; i++) {
    for (var y = 0; y < entries.length; y++) {
      if (entries[y].user_id === friends[i].followed_user_id) {
        friendEntries.push(entries[y])
      }
    }
  }
  return friendEntries
}

renderFriendEntries=()=>{
  debugger
  return this.state.friendEntries.map(entry=>{
    return <EntryCard {...entry}/>
  })
}

componentDidMount(){
  this.fetchEntries()
}

fun=()=>{
  console.log(this.state)
}

render(){
return (
    <div>
    <button onClick={this.fun}>fun</button>
      {this.renderFriendEntries()}
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    currentUser:state.currentUser,
    followings:state.followings
  }
}

const HOC = connect(mapStateToProps)
export default HOC(FriendFeed);
