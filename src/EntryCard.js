import React from 'react';
import UserCard from './UserCard';
import renderHTML from 'react-render-html'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from 'react-redux';


class EntryCard extends React.Component {

  state = {
    isClicked: false,
  }

  handleClick = () => {
    console.log(this.props)
    this.setState({
      isClicked: !this.state.isClicked
    })
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
        content: e.target.comment.value,
        user_id: this.props.currentUser.id,
        entry_id:this.props.id
        })
      }).then(r=>r.json())
      .then(this.getComments())
    }

getComments=()=>{
  debugger
}


render() {
  return (
      <div className="entryCard" onClick={this.handleClick}>
      <p className="username"> {this.props.user.username}</p>
      <p className="content">{ReactHtmlParser(this.props.content)} </p>
      <img className="avatar" src={this.props.user.avatar}></img>
      <p className="date">{this.props.date}</p>
      <form onSubmit={this.handleComment}>
        <label>
          <input type="text" name="comment" />
        </label>
        <input type="submit" value="Submit" />
      </form>

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
    currentUser: state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(EntryCard);
