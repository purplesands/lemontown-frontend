import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ProfileCard from './ProfileCard';

import UserFeed from './UserFeed';
import FriendFeed from './FriendFeed';
import LocationOne from './LocationOne';
import LocationTwo from './LocationTwo';
import UserList from './UserList';
import OtherUserFeed from './OtherUserFeed';



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
  } else if (props.activeLocation==="LocationTwo") {
    return <LocationTwo/>
  } else if (props.activeLocation==="OtherUserFeed") {
    return <OtherUserFeed handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>
  } else if (props.activeLocation==="OtherUserFeed") {
    return <UserList />

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
      followed_user_id:props.userToView.id
    })
  }).then(r=>r.json())
  .then(r=>updateFollowers())
  }

const handleUnfollow=(e)=>{
  fetch(`http://localhost:3000/followings/${e.id}`, {
      method: "DELETE"})
    .then(r=>updateFollowers())
  }

  const updateFollowers =()=>{
    fetch(`http://localhost:3000/users/${props.currentUser.id}`)
    .then(r=>r.json())
    .then(user=>props.dispatch({ type: "UPDATE_USER", payload:user}))
    .then(r=>updateUserToViewFollowers())
  }

  const updateUserToViewFollowers =()=>{
    fetch(`http://localhost:3000/users/${props.userToView.id}`)
    .then(r=>r.json())
    .then(user=>props.dispatch({ type: "UPDATE_USER_TO_VIEW", payload:user}))
  }

const getWords=()=>{
  fetch(`https://wordsapiv1.p.rapidapi.com/words/?random=true`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      'X-RapidAPI-Key':'4d90375dd6mshbfa9800b3e51019p1ebfd0jsn92f7ebed7441'
    }}).then(r=>r.json())
    .then(r=>{
      debugger
      props.dispatch({ type: "ADD_WORDS", payload:r})
    })
  }

return (
    <div>
    <p>welcome {props.currentUser.username}</p>
    <ProfileCard />
    <button value="wordgrab" onClick={getWords}>words?</button>
      <button value="UserFeed" onClick={handleClick}>user feed</button>
      <button value="FriendFeed" onClick={handleClick}>friend feed</button>
      <button value="LocationOne" onClick={handleClick}>location 1</button>
      <button value="LocationTwo" onClick={handleClick}>location 2</button>
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
    userToView: state.userToView,
    today: state.today,
    todaysWords: state.todaysWords
  }
}

const HOC = connect(mapStateToProps)
export default HOC(MainContainer);
