import React from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';


class FriendFeed extends React.Component {

  state={
    friends:[],
    entries:[],
    followingEntries:[]
  }

  fetchEntries=()=>{
    fetch('http://localhost:3000/entries')
    .then(r=>r.json())
    .then(r=>{this.setState({
      entries: r
    },()=> this.setState({
      followingEntries: this.matchEntries(this.state.entries, this.props.currentUser.followed_users)
      }))
    })
  }

  matchEntries = (entries, following) => {
    let followingEntries = []
    for (var i = 0; i < following.length; i++) {
      for (var y = 0; y < entries.length; y++) {
        if (entries[y].user_id === following[i].id) {
          followingEntries.push(entries[y])
        }
      }
    }
    return followingEntries.reverse()
  }

  renderFollowingEntries=()=>{
    return this.state.followingEntries.map(entry=>{
      return <EntryCard {...entry} fetchEntries={this.fetchEntries}/>
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
      {this.renderFollowingEntries()}
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
