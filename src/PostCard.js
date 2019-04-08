import React from 'react';
import UserCard from './UserCard';

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
    debugger
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
    return  <p>{c.content}</p>
    })
  }

render() {
  return (
      <div className="postCard">
      <p style={{"font-weight":"bold"}} onClick={this.renderProfileCard}>{this.props.user.username}</p>
      {this.renderPost()}
      <form onSubmit={this.handleComment}>
      <select class="dropdown" onChange={this.handleChange}>
        <option value="goo">goo</option>
        <option value="goo">goo</option>
        <option value="cat">cat</option>
        <option value="steve">steve</option>
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
export default PostCard
