import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfileCard extends Component {

handleClick=()=>{
  console.log(this.props)
}

  render() {

    return (
      <div>
      <button onClick={this.handleClick}>what does this do</button>
        {this.props.currentUser.username}
        {this.props.currentUser.followed_users.length}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

const HOC = connect(mapStateToProps)
export default HOC(ProfileCard);
