import React, { Component } from 'react';

class PostForm extends Component {

  state= {
    content: '',
    posts:[]
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
          user_id:1,
          location_id:1
        })
      }).then(r=>r.json())
        .then(r=>this.props.updatePosts())
        this.setState({
          content: "",
        });
      }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          <input type="submit" value="post" />
        </form>
      </div>
    );
  }
}
export default PostForm
