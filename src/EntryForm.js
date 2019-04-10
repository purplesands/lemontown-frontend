import React, { Component } from 'react';
import { connect } from 'react-redux';


class EntryForm extends Component {

  state= {
    content: '',
    characters:500
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
    this.setState({ [e.target.name]: e.target.value, characters:500-e.target.value.length });
  }

  render() {
    return (

      <div>
        <form onSubmit={this.handleSubmit}>
            <textarea
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              rows="4" cols="50"
              maxlength="500"
              minlength="1"
            />
          <input type="submit" value="post" />
        </form>
        {this.state.characters} left
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
