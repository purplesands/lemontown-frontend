import React from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';

class ArchivedDate extends React.PureComponent {

  state={
    day:{},
    posts:[]
  }

  fetchDay=(e)=>{
      fetch(`http://localhost:3000/days/${this.props.dateToView}`)
      .then(r=>r.json())
      .then(r=>this.setState({day:r, posts:r.posts}))
    }

  getPosts=()=>{
    return this.state.posts.map(post=>{
      if (!post.is_image) {
      return <p className="archivedPost"> {post.content}
              <td>{post.content}{post.content}</td>
              </p>
            } else {
            return  <img className="archiveImage" src={post.content} alt={post.content}></img>
            }
    })
    return this.state.posts.reverse().map(post=>{
      return <p className="archivedPost"> {post.content}
              <td>{post.content}{post.content}</td>
              </p>
    })

  }

  componentDidMount(){
    this.fetchDay()
    setInterval(this.fetchDay, 1000)
  }

  render(){
    return (
      <div className="archive">
      <p className="oldWords">{this.state.day.word1} {this.state.day.word2} {this.state.day.word3}<p> {this.state.day.word4}</p> {this.state.day.word5}</p>
      <div>{this.getPosts()}</div>
      </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      today:state.today,
      dateToView:state.dateToView
    }
  }

const HOC = connect(mapStateToProps)
export default HOC(ArchivedDate);
