import React from 'react';
import PostForm from './PostForm'
import PostCard from './PostCard'

import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider'

class LocationOne extends React.PureComponent {
  state={
    posts: [],
    location: {},
    days:[]
  }

  fetchLocation = () =>{
    fetch('https://lemon-town-api.herokuapp.com/locations/1')
    .then(r=>r.json())
    .then(r=>{
      this.setState({
        location: r
        })
      }
    )
  }

  fetchPosts = () =>{
     fetch('https://lemon-town-api.herokuapp.com/posts')
     .then(r=>r.json())
     .then(r=>{
       this.setState({
         posts: this.setPosts(r.reverse()),
         newPosts: []
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
  return {
    today:state.today,
    location:state.activeLocation
  }
}



const HOC = connect(mapStateToProps)
export default HOC(LocationOne);
