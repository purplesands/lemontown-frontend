import React, { Fragment } from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import Useful from './Useful'
import AnimationTest from './AnimationTest'

class PostCard extends React.Component {

  state = {
    isClicked: false,
    chosenWord:this.props.today.word1
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
  }

  handleChange=(e)=>{
    this.setState({
      chosenWord:e.target.value
    })
  }

  renderComments=(e)=>{
    const style = {
      letterSpacing:"4px",
      lineHeight:"90%"
    }
    return this.props.post_comments.map(c=>{
    return  <div style={style} className="postComment">{c.content}</div>
    })
  }


shouldComponentUpdate(nextProps, nextState){
  return (this.props.post_comments.length==nextProps.post_comments.length && nextState.chosenWord == this.state.chosenWord) ?  false :  true
}


render() {
  return (
    <Fragment>
      <div className="postCard">
        <AnimationTest key={this.props.id} cool={this.props} renderComments={this.renderComments} handleChange={this.handleChange} handleComment={this.handleComment}
        word={this.state.chosenWord}/>
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
