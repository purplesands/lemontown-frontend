import React from 'react';
import { connect } from 'react-redux';


const ProfileCard =(props)=> {

  const handleClick=(e)=>{
    props.dispatch({ type: "CHANGE_LOCATION", payload:e.target.value})
  }

    return (
      <div className="profileCard">
        <p><img className="avatar" src={props.currentUser.avatar} alt={props.currentUser.username}></img></p>
        <button className="profileBtn" value="ProfilePage" onClick={handleClick}>{props.currentUser.username}</button>
      </div>
    );
  }

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(ProfileCard);
