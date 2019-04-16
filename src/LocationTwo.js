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
    debugger
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
  return  arr.map(post=>{
      return <td><PostCard key={post.id} {...post} updatePosts={this.fetchPosts}/></td>
    })
  }


  componentDidMount(){
    this.fetchLocation()
    this.fetchPosts()
    }

  updateComment=(comment)=>{
    let posts = [...this.state.posts]
    let newPosts = [...this.state.newPosts]
    if (posts.find(post=>comment.post_id===post.id)) {
        let index =(posts.findIndex(post=>comment.post_id===post.id))
        let postToUpdate = posts.splice(index,1)
        postToUpdate[0].post_comments= [...postToUpdate[0].post_comments, comment]
        posts.splice(index, 0, postToUpdate[0])
        this.setState({posts:posts})
    } else if (newPosts.find(post=>comment.post_id===post.id)) {
        let index =(newPosts.findIndex(post=>comment.post_id===post.id))
        let postToUpdate = newPosts.splice(index,1)
        postToUpdate[0].post_comments= [...postToUpdate[0].post_comments, comment]
        newPosts.splice(index, 0, postToUpdate[0])
        this.setState({newPosts:newPosts})
    }
  }



    addPost = (post) => {
      if (post.id === null) {
        this.updateComment(post)
      } else {
        fetch(`http://localhost:3000/posts/${post.id}`)
        .then(r=>r.json())
        .then(post=> this.setState({
          newPosts:[post, ...this.state.newPosts]
        }))
      }
    };

    handleDelete=(e)=>{
      e.preventDefault()
      let toDelete = []
      let posts = [...this.state.posts].reverse()
      toDelete=posts.splice(0,5)
      this.setState({posts:posts})
      debugger
      var i;
        for (i = 0; i < toDelete.length; i++) {
          fetch(`http://localhost:3000/posts/${toDelete[i].id}`,{
            method: "DELETE"
          })
        }
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
          this.setState({posts:[post, ...this.state.posts]})})
    }

    cool(){

      const postSound = new Sound("src/assets/post1.wav")
      const postSound2 = new Sound("src/assets/post2.wav")
      postSound.play()
    }




render(){
  return (
      <Fragment>
        <ActionCableConsumer
          channel={{ channel: 'LocationTwoFeedChannel'}}
          onReceived={post=>this.addPost(post)}
        />
        <button onClick={this.cool}>cool</button>

        <button onClick={this.handleDelete}>bin</button>
        <button onClick={this.handleBird}>bird</button>
        <button onClick={this.handleVegetable}>veg</button>

        <div className="locationTwoPostForm"><PostForm addPost={this.addPost} updatePosts={this.fetchPosts} location={2} /></div>
        <div className="flex-container">
        {this.renderPosts(this.state.newPosts)}
        {this.renderPosts(this.state.posts)}

        </div>

      </Fragment>
    );
  }
}

function Sound(src) {
this.sound = document.createElement("audio")
this.sound.src = src
this.sound.setAttribute("preload", "auto")
this.sound.setAttribute("controls", "none")
this.sound.style.display = "none"
document.body.appendChild(this.sound)
}

Sound.prototype.play = function(){
this.sound.play();
}

Sound.prototype.stop = function(){
this.sound.pause();
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
