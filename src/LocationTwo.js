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
    days:[],
    newPosts:[]
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
    // let cool = arr.filter(post=>{
    //   return post.location_id === 2
    // })
    return arr.filter(post=>{
      return post.day_id === this.props.today.id
    })
  }

 renderPosts = (arr) =>{
  return  arr.map(post=>{
      return <td><PostCard key={post.id} {...post} updatePosts={this.fetchPosts}/></td>
    })
  }


  componentDidMount(){
    this.fetchLocation()
    this.fetchPosts()
    }


    addPost = (post) => {
      debugger
      // if (post.id === null) {
        this.fetchPosts()
      // } else {
      //   fetch(`http://localhost:3000/posts/${post.id}`)
      //   .then(r=>r.json())
      //   .then(post=>  this.setState({
      //     newPosts:[...this.state.newPosts,post]
      //   }))
      // }
    };

render(){
  return (
      <Fragment>
        <ActionCableConsumer
          channel={{ channel: 'LocationTwoFeedChannel'}}
          onReceived={this.fetchPosts}
        />
        <div className="locationTwoPostForm"><PostForm updatePosts={this.fetchPosts} location={2} /></div>
        <div className="flex-container">
        {this.renderPosts(this.state.posts)}
        </div>

      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  console.log('%c mapStateToProps', 'color: yellow', state);
  return {
    today:state.today,
    location:state.activeLocation,
    currentUser: state.currentUser

  }
}

const HOC = connect(mapStateToProps)
export default HOC(LocationTwo);
