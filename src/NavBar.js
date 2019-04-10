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

const NavBar = (props) => {

const handleClick=(e)=>{
    console.log(e.target.value)
    console.log(props.currentUser)
    props.dispatch({ type: "CHANGE_LOCATION", payload:e.target.value})
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
  props.dispatch({ type: "UPDATE_DATE_TO_VIEW", payload:e.target.value})
}

const handleSubmit=(e)=>{
  e.preventDefault()
  if (props.activeLocation==="ArchivedDate") {
  props.dispatch({ type: "CHANGE_LOCATION", payload:null})
  props.dispatch({ type: "CHANGE_LOCATION", payload:"ArchivedDate"})
} else {
  props.dispatch({ type: "CHANGE_LOCATION", payload:"ArchivedDate"})
}
}

const archivedPosts=()=>{
  return(
  <form onSubmit={(e)=>handleSubmit(e)}>
    <select class="dropdown" onChange={handleChange}>
      <option value="pick">archived posts</option>
      {props.days.map(day=>{
      return  <option value={day.id}>{day.date}</option>
      })}
    </select>
    <input type="submit" name="text" value="hmm" />
  </form>
  )
}

const logout=()=>{
  props.dispatch({ type: "LOGOUT"})
}

return (
    <div className="navBar">
    <button onClick={logout}>logout!</button>
    <p>today is {renderDate()}</p>
      <button value="UserFeed" onClick={handleClick}>user feed</button>
      <button value="FriendFeed" onClick={handleClick}>friend feed</button>
      <button value="LocationOne" onClick={handleClick}>location 1</button>
      <button value="LocationTwo" onClick={handleClick}>location 2</button>
      <button value="UserList" onClick={handleClick}>all users</button>
      <button value="ProfilePage" onClick={handleClick}>my profile</button>
      <p>{archivedPosts()}</p>


    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    activeLocation: state.activeLocation,
    userToView: state.userToView,
    today: state.today,
    todaysWords: state.todaysWords,
    days:state.days,
    dateToView:state.dateToView
  }
}

const HOC = connect(mapStateToProps)
export default HOC(NavBar);
