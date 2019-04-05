import React, { Component } from 'react';
import { connect } from 'react-redux';


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
          user_id:this.props.currentUser.id,
          location_id:this.props.location
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

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

const HOC = connect(mapStateToProps)
export default HOC(PostForm);
