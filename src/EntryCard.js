import React from 'react';
import UserCard from './UserCard';
import renderHTML from 'react-render-html'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from 'react-redux';


class EntryCard extends React.Component {

  state = {
    isClicked: false,
    comment: ''
  }

  handleClick = () => {
    console.log(this.props)
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  handleChange=(e)=>{
    this.setState({
      comment: e.target.value
    })
    console.log(this.state.comment)
  }

  handleComment=(e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/entry_comments', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        content: this.state.comment,
        user_id: this.props.currentUser.id,
        entry_id:this.props.id
        })
      }).then(r=>r.json())
      .then(r=>this.setState({comment:''}))
      .then(r=> this.props.fetchEntries())
    }

renderComments=()=>{
  return this.props.entry_comments.map(comment=>{
    return <p className="entryComment">{comment.content}</p>
  })
}


render() {
  return (
      <div className="entryCard">
      <p className="username"> {this.props.user.username}</p>
      <p className="content">{ReactHtmlParser(this.props.content)} </p>
      <img className="avatar" src={this.props.user.avatar}></img>
      <p className="date">{this.props.date}</p>
      <div>{this.renderComments()}</div>

      {(this.props.currentUser.id===this.props.user.id) ?
        null
        :
        <form onSubmit={this.handleComment} onChange={this.handleChange}>
        <label>
          <input type="text" name="comment" value={this.state.comment} minLength="1" maxLength="20" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    }

      {(this.state.isClicked)
        ?
          <UserCard {...this.props} />
        :
          null
      }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    activeLocation: state.activeLocation
  }
}

const HOC = connect(mapStateToProps)
export default HOC(EntryCard);
