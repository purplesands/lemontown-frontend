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

const NavBar = (props) => {

const handleClick=(e)=>{
    props.dispatch({ type: "CHANGE_LOCATION", payload:e.target.value})
  }

const handleChange=(e)=>{
  if (e.target.value==="nothing") {
  return  null
} else {
  props.dispatch({ type: "UPDATE_DATE_TO_VIEW", payload:e.target.value})
  props.dispatch({ type: "CHANGE_LOCATION", payload:"ArchivedDate"})
}
}


const archivedPosts=()=>{
  let index=0
  let days = [...props.days]
  days.reverse().splice(0, 1)
  return(
  <form >
  <div className="archiveMenu">
    <select onChange={handleChange}>
      <option value="nothing">older</option>
      {days.map(day=>{
        index++
      return  <option key={day.id} value={day.id}>{index} {(index===1) ? "day" : "days"} ago</option>
      })}
    </select>
    </div>
  </form>
  )
}

const logout=()=>{
  props.dispatch({ type: "LOGOUT"})
}


return (
    <table >
      <tbody className="navBar">
        <tr>
          <td>  <button className="nav" value="UserFeed" onClick={handleClick}>{props.currentUser.username}</button></td>
          <td>  <button className="nav" value="FriendFeed" onClick={handleClick}>friends</button></td>
          <td>  <button className="nav" value="LocationTwo" onClick={handleClick}>chat</button></td>
          <td>  <button className="nav" value="UserList" onClick={handleClick}>all users</button></td>
          <td>  <button className="nav" value="ProfilePage" onClick={handleClick}>my profile</button></td>
          <td>  {archivedPosts()}</td>
          <td>  <button className="logout" onClick={logout}>leave</button></td>
          <td className="wordCard"><WordCard/></td>
        </tr>
      </tbody>
    <div className="profileCard">
    <ProfileCard />
    </div>
    </table>

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
