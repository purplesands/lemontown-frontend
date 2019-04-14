import React, { Fragment } from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import Useful from './Useful'
import AnimationTest from './AnimationTest'

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
      return
     } else {
        return <div><img src={this.props.content} alt="post"></img></div>
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
    return  <p style={{letterSpacing:"5px"}} className="postComment">{c.content}</p>
    })
  }


render() {
  return (
    <Fragment>
    <div className="postCard">
<AnimationTest cool={this.props} renderComments={this.renderComments} handleChange={this.handleChange} handleComment={this.handleComment}/>
</div>
</Fragment>
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
