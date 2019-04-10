import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfilePage extends Component {

  render() {
    return (
      <div className="profilePage">
        <p>hi</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(ProfilePage);
