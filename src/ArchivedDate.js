import React from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';

class ArchivedDate extends React.Component {

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
      return <td>{post.content}</td>
    })
  }

  componentDidMount(){
    this.fetchDay()
  }

  render(){
    return (
      <div>
      <td>{this.state.day.word1}</td><td>{this.state.day.word2}</td><td>{this.state.day.word3}</td>
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
