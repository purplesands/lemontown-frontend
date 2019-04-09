import React from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';

class PostCard extends React.Component {

  state = {
    isClicked: false,
    chosenWord:null
  }

  renderProfileCard = () => {
      this.setState({
        isClicked: !this.state.isClicked
      })
  }

  renderPost = () =>{
    if (this.props.is_image === false) {
      return <div> <p>{this.props.content} </p>
      <p>{this.props.date}</p></div>
     } else {
        return <div><img src={this.props.content} alt="post"></img>
        <p>{this.props.date}</p></div>
      }
    }

  handleComment=(e)=>{
    console.log(this.state)
    e.preventDefault();
    fetch('http://localhost:3000/post_comments', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        content: this.state.chosenWord,
        user_id:this.props.user.id,
        post_id:this.props.id,
      })
    }).then(r=>r.json())
    .then(r=>this.props.updatePosts())

  }

  handleChange=(e)=>{
    this.setState({
      chosenWord:e.target.value
    })
  }

  renderComments=(e)=>{
    return this.props.post_comments.map(c=>{
    return  <td className="postComment">{c.content}</td>
    })
  }

render() {
  debugger
  return (
      <div className="postCard">
      <p style={{"font-weight":"bold"}} onClick={this.renderProfileCard}>{this.props.user.username}</p>
      {this.renderPost()}
      <form onSubmit={this.handleComment}>
      <select class="dropdown" onChange={this.handleChange}>
        <option value="pick">pick</option>
        <option value={this.props.today.word1}>{this.props.today.word1}</option>
        <option value={this.props.today.word2}>{this.props.today.word2}</option>
        <option value={this.props.today.word3}>{this.props.today.word3}</option>
      </select>
      <input type="submit" name="text" value="comment" />
      </form>
      <p>{this.renderComments()}</p>
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
    today:state.today
  }
}

const HOC = connect(mapStateToProps)
export default HOC(PostCard);
