import React, { Fragment, Component  } from 'react';
import PostForm from './PostForm'
import PostCard from './PostCard'
import CanvasDraw from "react-canvas-draw";
import birds from './assets/birds'

import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider'

class LocationTwo extends React.Component {
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
      if (post.id === null) {
        this.fetchPosts()
      } else {
        fetch(`http://localhost:3000/posts/${post.id}`)
        .then(r=>r.json())
        .then(post=> this.setState({
          posts:[post, ...this.state.posts]
        }))
      }
    };

    handleDelete=(e)=>{
      e.preventDefault()
      let toDelete = []
      let posts = [...this.state.posts].reverse().splice(0,10)
      posts.map(post=>{
        return toDelete.push(post.id)
      })
      debugger
      var i;
        for (i = 0; i < toDelete.length; i++) {
          fetch(`http://localhost:3000/posts/${toDelete[i]}`,{
            method: "DELETE"
          })
        }
        this.fetchPosts()
    }

    handleBird=(e)=>{
      e.preventDefault()
    let bird = birds[Math.floor(Math.random()*birds.length)];
        fetch('http://localhost:3000/posts', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            content: bird,
            user_id:this.props.currentUser.id,
            location_id:2,
            is_image: true,
            day_id: this.props.today.id
          })
        }).then(r=>r.json())
        .then(post=>{
          this.fetchPosts()})
    }


render(){
  return (
      <Fragment>
        <ActionCableConsumer
          channel={{ channel: 'LocationTwoFeedChannel'}}
          onReceived={post=>this.addPost(post)}
        />
        <button onClick={this.handleDelete}>bin</button>
        <button onClick={this.handleBird}>bird</button>
        <button onClick={this.handleVegetable}>veg</button>

        <div className="locationTwoPostForm"><PostForm updatePosts={this.fetchPosts} location={2} /></div>
        <div className="flex-container">
        {this.renderPosts(this.state.posts)}

        </div>

      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    today:state.today,
    location:state.activeLocation,
    currentUser: state.currentUser

  }
}

const HOC = connect(mapStateToProps)
export default HOC(LocationTwo);
