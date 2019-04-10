import React, { Fragment } from 'react';
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
  } else if (props.activeLocation==="UserList") {
    return <UserList handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>
  } else if (props.activeLocation==="ArchivedDate") {
    return <ArchivedDate />
    // return <FollowerList />

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

  const renderDate=()=>{
    let date = props.today.date
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let day = date.substr(5,2)
    let monthIndex = date.substr(8,2)
    let year = date.substr(0, 4);
  return day + ' ' + monthNames[parseInt(monthIndex-1)] + ' ' + year;
}

const handleChange=(e)=>{
  props.dispatch({ type: "CHANGE_LOCATION", payload:"ArchivedDate"})
  props.dispatch({ type: "UPDATE_DATE_TO_VIEW", payload:e.target.value})
}

const handleSubmit=(e)=>{
  e.preventDefault()
  if (props.activeLocation==="ArchivedDate") {
  props.dispatch({ type: "CHANGE_LOCATION", payload:null})
} else {
  props.dispatch({ type: "CHANGE_LOCATION", payload:"ArchivedDate"})
}
}

const archivedPosts=()=>{
  return(
  <form onSubmit={(e)=>handleSubmit(e)}>
    <select class="dropdown" onChange={handleChange}>
      <option value="pick">see daily archives</option>
      {props.days.map(day=>{
      return  <option value={day.id}>{day.date}</option>
      })}
    </select>
    <input type="submit" name="text" value="hmm" />
  </form>
  )
}

return (
    <div>
    <p>today is {renderDate()}</p>
    <p>welcome {props.currentUser.username}</p>
    <p>{archivedPosts()}</p>
    <WordCard />
    <ProfileCard />
      <button value="UserFeed" onClick={handleClick}>user feed</button>
      <button value="FriendFeed" onClick={handleClick}>friend feed</button>
      <button value="LocationOne" onClick={handleClick}>location 1</button>
      <button value="LocationTwo" onClick={handleClick}>location 2</button>
      <button value="UserList" onClick={handleClick}>all users</button>
      {renderComponent()}
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
