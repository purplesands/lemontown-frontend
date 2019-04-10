import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfilePage extends Component {

  render() {
    return (
      <div className="profileCard">
        <p>{this.props.currentUser.username}</p>
        <p>{this.props.currentUser.avatar}</p>
        <p>following:{this.props.currentUser.followed_users.length}</p>
        <p>followers:{this.props.currentUser.follower_users.length}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(ProfilePage);
