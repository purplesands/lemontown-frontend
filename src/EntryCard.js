import React from 'react';
import UserCard from './UserCard';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from 'react-redux';
import Useful from './Useful'
import { url } from './helpers';

import Comment from './Comment'


class EntryCard extends React.Component {

  state = {
    isClicked: false,
    comment: '',
    num: null,
    characters:20,
    show:false
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
    fetch(`${url}/entry_comments`, {
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


componentDidMount(){
  this.setState({num:Useful.letterSpacing(10)})
}

renderComments=()=>{
  return this.props.entry_comments.map(comment=>{
    return <Comment {...comment} />
  })
}

handleCommentForm=()=>{
  this.setState({show:!this.state.show})
  console.log(this.state.show)

}


render() {
  return (
    <div className="entryCard">
      <p><img className="avatar" src={this.props.user.avatar}></img></p>
      <p className="username"> {this.props.user.username}</p>
      <p className="date">{this.props.date}</p>
      <p className="content">{ReactHtmlParser(this.props.content)} </p>
      <div>{this.renderComments()}</div>

      {(this.props.currentUser.id===this.props.user.id) ?
        null
        : (!this.state.show) ?
        <button className="entryComment" onClick={this.handleCommentForm}>?</button>
      :
      <form className="commentForm" onSubmit={this.handleComment} onChange={this.handleChange}>
        <label>
          <input type="text" name="comment" value={this.state.comment} minLength="1" maxLength="20" />
        </label>
      <button className="entryComment" type="submit" onSubmit={e=>this.handleComment(e)}>{this.state.characters-this.state.comment.length}</button>
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
