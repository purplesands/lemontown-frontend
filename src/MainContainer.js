import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import UserFeed from './UserFeed';
import FriendFeed from './FriendFeed';
import LocationOne from './LocationOne';
import LocationTwo from './LocationTwo';


const MainContainer = (props) => {

return (
    <div>
    <p>welcome {props.currentUser}</p>
      <UserFeed/>
      <FriendFeed/>
      <LocationOne/>
      <LocationTwo/>
    </div>
  );
}

function mapStateToProps(state) {
  console.log('%c maincontainer', 'color: blue', state);
  return {
    currentUser: state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(MainContainer);
