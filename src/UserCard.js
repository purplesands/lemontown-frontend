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

handleFollow=(e)=>{
  this.props.handleFollow(e)
}

componentDidMount(){

}

  render() {
    return (
    (this.props.user) ?
      <div className="postUserCard">
        <p>{this.props.user.username}</p>
        <img className="user avatar" src={this.props.user.avatar} alt="avatar"></img>
        <p className="followingList">following:{this.props.user.followed_users.length}</p>
        <p className="followerList">followers:{this.props.user.follower_users.length}</p>
        <button onClick={this.handleClick}>see full profile!</button>
      </div>
      :
      <div className="userListCard">
        <p className="userListName">{this.props.username}</p>
        <img className="user avatar" src={this.props.avatar} alt="avatar"></img>
        <p className="followingList" onClick={this.showFollowers}>following:{this.props.followed_users.length}</p>
        <p className="followerList">followers:{this.props.follower_users.length}</p>
        <button className="viewUserBtn" onClick={this.handleClick}>?</button>
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
