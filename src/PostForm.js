import React, { Component } from 'react';
import { connect } from 'react-redux';


class PostForm extends Component {

  state= {
    content: '',
    posts:[],
    characters:75,
    isImage: false,
    typing: false
  }

  handleSubmit = (e) => {
      e.preventDefault();
      fetch('https://lemon-town-api.herokuapp.com/posts', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          content: this.state.content,
          user_id:this.props.currentUser.id,
          location_id:this.props.location,
          is_image: this.state.isImage,
          day_id: this.props.today.id
        })
      }).then(r=>r.json())
        this.setState({
          content: "",
        }) ;
      }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, characters:75-e.target.value.length });
  }

  setPostType=()=>{
    this.setState({isImage:!this.state.isImage})
  }

  render() {
    return (
      <div className="postForm">
      <div className="chatBtns actions">
        <button className="actionBtn" onClick={this.props.handleBird}>bird</button>
        <button className="actionBtn" onClick={this.props.handleDelete}>too much</button>
      </div>
      {(this.state.isImage===false)
        ?
        <form onSubmit={this.handleSubmit}>
          <p>  <textarea
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              rows="4" cols="22"
              maxLength="75"
              minLength="1"
              onKeyUp={this.typing}
              className="textBox"
            /></p>
            <div className="chatBtns">
          <button className="actionBtn two" onClick={this.setPostType}>{(this.state.isImage===true) ? "text?" : "image?"}</button>
          <button className="messageBtn" type="submit" name="text" value="💬">
          {this.state.characters}
          </button>

          </div>

        </form>
        :
        null }
    {(this.state.isImage===true)
      ?
    <form onSubmit={this.handleSubmit}>
        <p><input type="text"
        name="content"
        onChange={this.handleChange}
        ></input></p>
        <div className="chatBtns">
        <button className="actionBtn two" onClick={this.setPostType}>{(this.state.isImage===true) ? "text?" : "image?"}</button>
        <button className="messageBtn" type="submit" name="image" value="ok" >ok</button>
        </div>

        </form>

        :
        null }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    today: state.today
  }
}

const HOC = connect(mapStateToProps)
export default HOC(PostForm);
