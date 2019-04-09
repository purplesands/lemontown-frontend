import React from 'react';
import PostForm from './PostForm'
import PostCard from './PostCard'

import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider'

class LocationOne extends React.Component {
  state={
    posts: [],
    location: {}
  }

  fetchLocation = () =>{
    fetch('http://localhost:3000/locations/1')
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
      return post.location_id === 1
    })
    return cool.filter(post=>{
      return post.day_id === this.props.today.id
    })
  }




 renderPosts = (arr) =>{
  return  arr.map(post=>{
      return <PostCard {...post} updatePosts={this.fetchPosts}/>
    })
  }

  componentDidMount(){
    this.fetchLocation()
    this.fetchPosts()
  }

render(){
  return (
      <div>
      <ActionCableConsumer
        channel={{ channel: 'LocationOneFeedChannel'}}
        onReceived={
          this.fetchPosts
        }

      />
        <h1>{this.state.location.name}</h1>
          <PostForm updatePosts={this.fetchPosts} location={1} />
          {this.renderPosts(this.state.posts)}
      </div>
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
export default HOC(LocationOne);
