import React, { Fragment } from 'react';
import UserFeed from './UserFeed';
import FriendFeed from './FriendFeed';
import LocationOne from './LocationOne';
import LocationTwo from './LocationTwo';


const MainContainer = (props) => {





return (
    <div>
      <UserFeed/>
      <FriendFeed/>
      <LocationOne/>
      <LocationTwo/>
    </div>
  );
}
export default MainContainer
