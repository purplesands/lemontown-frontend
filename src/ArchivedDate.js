import React from 'react';
import { connect } from 'react-redux';
import { url } from './helpers';


class ArchivedDate extends React.PureComponent {

  state={
    day:{},
    posts:[]
  }

  fetchDay=(e)=>{
      fetch(`${url}/days/${this.props.dateToView}`)
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
      return (<p className="archivedPost"> {post.content}
              <p>{post.content}{post.content}</p>
              </p>)
    })

  }

  componentDidMount(){
    this.fetchDay()
    setInterval(this.fetchDay, 750)
  }

  render(){
    return (
      <div className="archive">
        <p className="oldWords">
        {this.state.day.word1} {this.state.day.word2} {this.state.day.word3} {this.state.day.word4} {this.state.day.word5}</p>
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
