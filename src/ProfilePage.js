import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfilePage extends Component {

  state={
    editStatus:false,
    username : this.props.currentUser.username,
    bio: this.props.currentUser.bio
  }

  toggleEdit=()=>{
    this.setState({editStatus:true})
  }

  handleEdit=(e)=>{
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        username: this.state.username,
        bio: this.state.bio
      })
    }).then(r=>r.json())
    .then(user=>{
      this.props.dispatch({ type: "UPDATE_USER", payload: user})
    })


    this.setState({editStatus:false})
  }

  updateAttributes=(e)=>{
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="profilePage">
      {(!this.state.editStatus) ?
        <div>
      <button onClick={this.toggleEdit}>edit details</button>
      <img src={this.props.currentUser.avatar} alt="avatar"></img>
        <p> {this.props.currentUser.username}</p>
        <p> {this.props.currentUser.bio}</p>
        </div>
    :
    <div>
      <button onClick={this.handleEdit}>save</button>
      <img src={this.props.currentUser.avatar} alt="avatar"></img>
      <p className="profilePage edit">avatar:<p><input type="text"
                name="avatar"
                value={this.props.currentUser.avatar}
                onChange={this.updateAttributes}
                  /></p></p>

      <p className="profilePage edit">handle:<p><input type="text"
                name="username"
                value={this.state.username}
                onChange={this.updateAttributes}
                maxLength="12"
                  /></p></p>
      <p><p className="profilePage edit">bio:</p><input type="text"
                name="bio"
                value={this.state.bio}
                onChange={this.updateAttributes}
                maxLength="200"
                /></p>


    </div>

    }
    </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(ProfilePage);
