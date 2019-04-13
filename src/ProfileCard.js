import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfileCard extends Component {

  render() {
    return (
      <div className="profileCard">
        <p>{this.props.currentUser.username}</p>
        <img className="avatar" src={this.props.currentUser.avatar} alt={this.props.currentUser.username}></img>
        <p>following:{this.props.currentUser.followed_users.length}</p>
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
export default HOC(ProfileCard);
