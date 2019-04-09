import React, { Component } from 'react';
import { connect } from 'react-redux';


class UserCard extends Component {


handleClick=(e)=>{
  if (this.props.user) {
    this.props.dispatch({ type: "CHANGE_LOCATION", payload:"OtherUserFeed"})
    this.props.dispatch({ type: "UPDATE_USER_TO_VIEW", payload:this.props.user})
  } else {
    this.props.dispatch({ type: "CHANGE_LOCATION", payload:"OtherUserFeed"})
    this.props.dispatch({ type: "UPDATE_USER_TO_VIEW", payload:this.props})
    }
  }

  showFollowers=(e)=>{
    // debugger
    // this.props.dispatch({ type: "CHANGE_LOCATION", payload:"FollowerList"})
    // this.props.dispatch({ type: "UPDATE_USER_TO_VIEW", payload:this.props})
    //
    console.log('followers?')
  }

componentDidMount(){

}

  render() {
    return (
    (this.props.user) ?
      <div className="postUserCard">
        <p>{this.props.user.username}</p>
        <p className="followingList">following:{this.props.user.followed_users.length}</p>
        <p className="followerList">followers:{this.props.user.follower_users.length}</p>
        <button onClick={this.handleClick}>see full profile!</button>
      </div>
      :
      <div className="userListCard">
        <p>{this.props.username}</p>
        <p className="followingList" onClick={this.showFollowers}>following:{this.props.followed_users.length}</p>
        <p className="followerList">followers:{this.props.follower_users.length}</p>
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
