import React, { Fragment } from 'react';
import PostForm from './PostForm'
import PostCard from './PostCard'


import { ActionCableConsumer } from 'react-actioncable-provider'

class LocationTwo extends React.Component {
  state={
    posts: [],
    location: {}
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
         posts: this.filterPosts(r.reverse())
       })
     }
   )
  }

  filterPosts=(arr)=>{
   return arr.filter(post=>{
    return post.location_id === 2}
  )}


  renderPosts = (arr) =>{
   return  arr.map(post=>{
       return <PostCard {...post} />
     })
   }

  componentDidMount(){
    this.fetchPosts()
    this.fetchLocation()
  }


render(){
  return (
      <div>
      <ActionCableConsumer
        channel={{ channel: 'LocationTwoFeedChannel'}}
        onReceived={
          this.fetchPosts
        }

      />
        <h1>location 2</h1>
          <PostForm updatePosts={this.fetchPosts} location={2} />
          {this.renderPosts(this.state.posts)}
      </div>
    );
  }
}
// function mapStateToProps(state) {
//   console.log('%c mapStateToProps', 'color: yellow', state);
//   return {
//     posts:state.posts
//   }
// }
//
// const HOC = connect(mapStateToProps)
export default LocationTwo;
