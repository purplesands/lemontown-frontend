import React from 'react';
import { connect } from 'react-redux';
import ProfileCard from './ProfileCard';

import UserFeed from './UserFeed';
import FriendFeed from './FriendFeed';
import LocationOne from './LocationOne';
import LocationTwo from './LocationTwo';
import UserList from './UserList';
import OtherUserFeed from './OtherUserFeed';
import WordCard from './WordCard';
import ArchivedDate from './ArchivedDate';
import ProfilePage from './ProfilePage';
import NavBar from './NavBar'

const MainContainer = (props) => {


const renderComponent = ()=>{
  if (props.activeLocation==="UserFeed") {
    return <UserFeed/>
  } else if (props.activeLocation==="FriendFeed") {
    return <FriendFeed/>
  } else if (props.activeLocation==="LocationOne") {
    return <LocationOne/>
  } else if (props.activeLocation==="LocationTwo") {
    return <LocationTwo/>
  } else if (props.activeLocation==="OtherUserFeed") {
    return <OtherUserFeed handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>
  } else if (props.activeLocation==="UserList") {
    return <UserList handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>
  } else if (props.activeLocation==="ArchivedDate") {
    return <ArchivedDate />
  } else if (props.activeLocation==="ProfilePage") {
    return <ProfilePage />
  }else if (props.activeLocation===null){
    return <div className="titlePage">
          <p>lemontown</p>
          </div>

    // return <FollowerList />
  } else {
    return null
  }
}

const handleFollow=(e)=>{
  e.preventDefault();

  let id
  (!!props.userToView) ? id = props.userToView.id : id = e.target.value
  fetch('https://lemon-town-api.herokuapp.com/followings', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      user_id:props.currentUser.id,
      followed_user_id:id
    })
  }).then(r=>r.json())
  .then(r=>updateFollowers())
  }

const handleUnfollow=(e)=>{
  fetch(`https://lemon-town-api.herokuapp.com/followings/${e.id}`, {
      method: "DELETE"})
    .then(r=>updateFollowers())
  }

  const updateFollowers =()=>{
    fetch(`https://lemon-town-api.herokuapp.com/users/${props.currentUser.id}`)
    .then(r=>r.json())
    .then(user=>props.dispatch({ type: "UPDATE_USER", payload:user}))
    .then(r=>updateUserToViewFollowers())
  }

  const updateUserToViewFollowers =()=>{
    fetch(`https://lemon-town-api.herokuapp.com/users/${props.userToView.id}`)
    .then(r=>r.json())
    .then(user=>props.dispatch({ type: "UPDATE_USER_TO_VIEW", payload:user}))
  }

return (
    <div>
      <div className="mainContainer">{renderComponent()}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    addFollowing: state.currentUser.followed_users + 1,
    activeLocation: state.activeLocation,
    userToView: state.userToView,
    today: state.today,
    todaysWords: state.todaysWords,
    days:state.days,
    dateToView:state.dateToView

  }
}

const HOC = connect(mapStateToProps)
export default HOC(MainContainer);
