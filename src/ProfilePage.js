import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfilePage extends Component {

  state={
    editStatus:false,
    username : this.props.currentUser.username,
    bio: this.props.currentUser.bio,
    avatar: this.props.currentUser.avatar
  }

  toggleEdit=()=>{
    this.setState({editStatus:true})
  }

  handleEdit=(e)=>{
    fetch(`https://lemon-town-api.herokuapp.com/users/${this.props.currentUser.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        username: this.state.username,
        bio: this.state.bio,
        avatar: this.state.avatar
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
        <p className="profileUsername"> {this.props.currentUser.username}</p>
        <img className="profilePageAvatar" src={this.props.currentUser.avatar} alt="avatar"></img>
        <p style={{fontStyle:"italic"}}>{this.props.currentUser.bio}</p>
        <button className="editBtn" onClick={this.toggleEdit}>edit details</button>
        </div>
    :
    <div>
    <p className="profileUsername"> {this.props.currentUser.username}</p>
      <img className="profilePageAvatar" src={this.props.currentUser.avatar} alt="avatar"></img>
      <p className="profilePageEdit"><p>username</p><input className="profileEdit" type="text"
                name="username"
                value={this.state.username}
                onChange={this.updateAttributes}
                maxLength="12"
                  /></p>
      <p className="profilePageEdit"><p>avatar</p><input className="profileEdit"type="text"
                name="avatar"
                value={this.props.currentUser.avatar}
                onChange={this.updateAttributes}
                  /></p>

      <p className="profilePageEdit"><p>bio</p><input className="profileEdit" type="text"
                name="bio"
                value={this.state.bio}
                onChange={this.updateAttributes}
                maxLength="200"
                /></p>

                <button className="editBtn" onClick={this.handleEdit}>save</button>

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
