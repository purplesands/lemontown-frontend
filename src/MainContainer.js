import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ProfileCard from './ProfileCard';

import UserFeed from './UserFeed';
import FriendFeed from './FriendFeed';
import LocationOne from './LocationOne';
import LocationTwo from './LocationTwo';
import UserList from './UserList';


const MainContainer = (props) => {


const handleClick=(e)=>{
    console.log(e.target.value)
    console.log(props.currentUser)
    props.dispatch({ type: "CHANGE_LOCATION", payload:e.target.value})
  }

const renderComponent = ()=>{
  if (props.activeLocation==="UserFeed") {
    return <UserFeed/>
  } else if (props.activeLocation==="FriendFeed") {
    return <FriendFeed/>
  } else if (props.activeLocation==="LocationOne") {
    return <LocationOne/>
    debugger
  } else if (props.activeLocation==="LocationTwo") {
    return <LocationTwo/>
  } else {
    return null
  }
}

const handleFollow=(e)=>{
  e.preventDefault();
  fetch('http://localhost:3000/followings', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      user_id:props.currentUser.id,
      followed_user_id:2
    })
  }).then(r=>r.json())
  .then(r=>updateFollowers())
  }

const updateFollowers=()=>{
  fetch('http://localhost:3000/users', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      username: props.currentUser.username,
      })
    }).then(r=>r.json())
    .then(user=>props.dispatch({ type: "UPDATE_USER", payload:user}))
  }

return (
    <div>
    <p>welcome {props.currentUser.username}</p>
    <ProfileCard />
      <button value="UserFeed" onClick={handleClick}>user feed</button>
      <button value="FriendFeed" onClick={handleClick}>friend feed</button>
      <button value="LocationOne" onClick={handleClick}>location 1</button>
      <button value="LocationTwo" onClick={handleClick}>location 2</button>
      <button value="FollowGuy" onClick={handleFollow}>Follow guy 2</button>

      {renderComponent()}
    </div>
  );
}

function mapStateToProps(state) {
  console.log('%c maincontainer', 'color: blue', state);
  return {
    currentUser: state.currentUser,
    addFollowing: state.currentUser.followed_users + 1,
    activeLocation: state.activeLocation,
    followings:state.followings
  }
}

const HOC = connect(mapStateToProps)
export default HOC(MainContainer);
