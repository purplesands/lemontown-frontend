import React, { Fragment, Component  } from 'react';
import PostForm from './PostForm'
import PostCard from './PostCard'
import CanvasDraw from "react-canvas-draw";

import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider'

class LocationTwo extends Component {
  state={
    posts: [],
    location: {},
    days:[]
  }

  fetchLocation = () =>{
    fetch('http://localhost:3000/locations/2')
    .then(r=>r.json())
    .then(r=>{
      this.setState({
        location: r
        })
      }
    )
  }

  fetchPosts = () =>{
     fetch('http://localhost:3000/posts')
     .then(r=>r.json())
     .then(r=>{
       this.setState({
         posts: this.setPosts(r.reverse())
       })
     }
   )
  }

  setPosts=(arr)=>{
    let cool = arr.filter(post=>{
      return post.location_id === 2
    })
    return cool.filter(post=>{
      return post.day_id === this.props.today.id
    })
  }

 renderPosts = (arr) =>{
   let x=1
  return  arr.map(post=>{
      return <td><PostCard id={x++} {...post} updatePosts={this.fetchPosts}/></td>
    })
  }

  componentDidMount(){
    this.fetchLocation()
    this.fetchPosts()

    }

render(){
  return (
      <Fragment>
      <ActionCableConsumer
        channel={{ channel: 'LocationTwoFeedChannel'}}
        onReceived={
          this.fetchPosts
        }
      />
        <h1>{this.state.location.name}</h1>
          <div className="locationTwoPostForm"><PostForm updatePosts={this.fetchPosts} location={2} /></div>
          <div className="flex-container">{this.renderPosts(this.state.posts)}</div>
          </Fragment>
    );
  }
}
function mapStateToProps(state) {
  console.log('%c mapStateToProps', 'color: yellow', state);
  return {
    today:state.today,
    location:state.activeLocation
  }
}

const HOC = connect(mapStateToProps)
export default HOC(LocationTwo);
