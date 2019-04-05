import React, { Fragment } from 'react';
import { connect } from 'react-redux';
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



return (
    <div>
    <p>welcome {props.currentUser.username}</p>
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
    activeLocation: state.activeLocation
  }
}

const HOC = connect(mapStateToProps)
export default HOC(MainContainer);
