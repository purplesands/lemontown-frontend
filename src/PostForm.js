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
      fetch('http://localhost:3000/posts', {
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
        .then(r=>{
          this.props.updatePosts()})
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
      <div>
      <button onClick={this.setPostType}>{(this.state.isImage===true) ? "text?" : "image?"}</button>
      {(this.state.isImage===false)
        ?
        <form onSubmit={this.handleSubmit}>
            <textarea
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              rows="3" cols="30"
              maxlength="75"
              minlength="1"
              onKeyUp={this.typing}
            />
          <input type="submit" name="text" value="💬" />
          {this.state.characters}
        </form>
        :
        null }
    {(this.state.isImage===true)
      ?
    <form onSubmit={this.handleSubmit}>
        <input type="text"
        name="content"
        onChange={this.handleChange}
        ></input>
        <input type="submit" name="image" value="post image" />
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
