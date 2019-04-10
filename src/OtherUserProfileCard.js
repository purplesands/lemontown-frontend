import React, { Component } from 'react';
import { connect } from 'react-redux';


class OtherUserProfileCard extends Component {

  state={
    followStatus: null
  }

checkFollowing=()=>{
  (this.props.currentUser.followed_users.find(u=>{
    return u.id===this.props.userToView.id}))
    ?
      this.setState({followStatus: true})
    :
      this.setState({followStatus: false})

  }

handleClick=(e)=>{
  if (this.state.followStatus===false) {
    this.props.handleFollow(e)
  } else if (this.state.followStatus===true){
    let following = this.props.currentUser.followings.find(f=>{
      return f.followed_user_id === this.props.userToView.id
    })
    this.props.handleUnfollow(following)
  }
  this.setState({
    followStatus: !this.state.followStatus
  },
  this.checkFollowing())
}

componentDidMount(){
  this.checkFollowing()
}

  render() {
    return (
      <div>
      <button onClick={this.handleClick}>check the props</button>
        <p>{this.props.userToView.username}</p>
        <p>following:{this.props.userToView.followed_users.length}</p>
        <p>followers:{this.props.userToView.follower_users.length}</p>
        {(this.props.userToView.id === this.props.currentUser.id) ?
        null
          : 
        <button onClick={this.handleClick}>{((this.state.followStatus==true) ? "unfollow?" : "follow?")}</button>
       }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    userToView:state.userToView

  }
}

const HOC = connect(mapStateToProps)
export default HOC(OtherUserProfileCard);
