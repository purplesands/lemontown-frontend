import React from 'react';
import PostForm from './PostForm'
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider'

class LocationOne extends React.Component {
  state={
    posts: []
  }

   fetchPosts = () =>{
     fetch('http://localhost:3000/posts')
     .then(r=>r.json())
     .then(r=>{
       this.setState({
         posts: r
       })
     }
   )
  }


 renderPosts = (arr) =>{
  return  arr.map(p=>{
      return <div>{p.content}</div>
    })
  }

  componentDidMount(){
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
        location 1
          <PostForm updatePosts={this.fetchPosts} />
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
export default LocationOne;
