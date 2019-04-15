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
    console.log(e.target.value)
    console.log(props.currentUser)
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

// const handleSubmit=(e)=>{
//   e.preventDefault()
//   props.dispatch({ type: "CHANGE_LOCATION", payload:"ArchivedDate"})
// }

const archivedPosts=()=>{
  let index=0
  let days = [...props.days]
  return(
  <form >
  <div className="archiveMenu">
    <select onChange={handleChange}>
      <option value="nothing">older</option>
      {days.reverse().splice(-1, days.length-1).map(day=>{
        index++
      return  <option key={day.id} onSelect={()=>console.log(day.id)} value={day.id}>{index} {(index===1) ? "day" : "days"} ago</option>
      })}
    </select>
    </div>
  </form>
  )
}

const logout=()=>{
  props.dispatch({ type: "LOGOUT"})
}
// const index=()=>{
//  return <h1>home</h1>
// }
//
// const users=()=>{
// return <h1>users</h1>
// }
//
// const about=()=>{
// return <h1>about</h1>
// }
//
// const self=()=>{
// return <h1>self</h1>
// }
//
//
// const friends=()=>{
//   props.dispatch({ type: "CHANGE_LOCATION", payload:"FriendFeed"})
// }


return (
    <table className="navBar">
      <tbody>
        <tr>
          <td>  <button className="nav" value="UserFeed" onClick={handleClick}>{props.currentUser.username}</button></td>
          <td>  <button className="nav" value="FriendFeed" onClick={handleClick}>friend feed</button></td>
          <td>  <button className="nav" value="LocationOne" onClick={handleClick}>location 1</button></td>
          <td>  <button className="nav" value="LocationTwo" onClick={handleClick}>chat</button></td>
          <td>  <button className="nav" value="UserList" onClick={handleClick}>all users</button></td>
          <td>  <button className="nav" value="ProfilePage" onClick={handleClick}>my profile</button></td>
          <td>  {archivedPosts()}</td>
          <td>  <button className="logout" to="/login" onClick={logout}>leave</button></td>
        </tr>
      </tbody>
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
