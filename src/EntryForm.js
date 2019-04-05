import React, { Component } from 'react';
import { connect } from 'react-redux';


class EntryForm extends Component {

  state= {
    content: ''
  }

  handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/entries', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          content: this.state.content,
          user_id:this.props.currentUser.id
        })
      }).then(r=>r.json())
        .then(r=>this.props.updateEntries())
        this.setState({
          content: ''
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
export default HOC(EntryForm);
