import React, { Component } from 'react';
import { connect } from 'react-redux';


class UserCard extends Component {


handleClick=(e)=>{
  this.props.dispatch({ type: "CHANGE_LOCATION", payload:"OtherUserFeed"})
  this.props.dispatch({ type: "UPDATE_USER_TO_VIEW", payload:this.props.user})
}

componentDidMount(){

}

  render() {
    return (
      <div>
        <p>{this.props.user.username}</p>
        <p>following:{this.props.user.followed_users.length}</p>
        <p>followers:{this.props.user.follower_users.length}</p>
        <button onClick={this.handleClick}>see full profile!</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    activeLocation:state.activeLocation
  }
}

const HOC = connect(mapStateToProps)
export default HOC(UserCard);
