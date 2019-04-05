import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfileCard extends Component {

state= {
  followings:[]
}

handleClick=()=>{
  console.log(this.props)
}

componentDidMount(){
}
  render() {
    return (
      <div>
      <button onClick={this.handleClick}>check the props</button>
        <p>{this.props.currentUser.username}</p>
        <p>following:{this.props.currentUser.followed_users.length}</p>
        <p>followers:{this.props.currentUser.follower_users.length}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    followings:state.followings,
    followers:state.followers
  }
}

const HOC = connect(mapStateToProps)
export default HOC(ProfileCard);
