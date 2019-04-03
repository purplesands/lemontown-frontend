import React from 'react';
import PostForm from './PostForm'

class LocationOne extends React.Component {
  state={
    posts: []
  }

  componentDidMount(){
    this.fetchPosts()
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

render(){
return (
    <div>
      location 1
        <PostForm />
        {this.renderPosts(this.state.posts)}
    </div>
  );
}
}
export default LocationOne
