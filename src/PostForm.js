import React, { Component } from 'react';
import { connect } from 'react-redux';


class PostForm extends Component {

  state= {
    content: '',
    posts:[],
    characters:75,
    isImage: null
  }

  handleSubmit = (e) => {
    debugger
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
          is_image: this.state.isImage
        })
      }).then(r=>r.json())
        .then(r=>this.props.updatePosts())
        this.setState({
          content: "",
        });
      }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, characters:75-this.state.content.length });
  }

  setPostTypeToImage=()=>{
    this.setState({isImage:true})
  }

  setPostTypeToText=()=>{
    this.setState({isImage:false})
  }


  render() {
    return (
      <div>
      <button onClick={this.setPostTypeToText}>post text</button>
      <button onClick={this.setPostTypeToImage}>post image</button>
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
            />
          <input type="submit" name="text" value="post" />
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
  }
}

const HOC = connect(mapStateToProps)
export default HOC(PostForm);
