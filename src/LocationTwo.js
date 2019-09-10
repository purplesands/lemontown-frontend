import React, { Fragment } from 'react';
import PostForm from './PostForm'
import PostCard from './PostCard'
import birds from './assets/birds'
import { url } from './helpers';


import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider'

class LocationTwo extends React.Component {
  state={
    posts: [],
    location: {},
    days:[],
    newPosts:[],
    loading: null
  }

  fetchLocation = () =>{
    fetch(`${url}/locations/2`)
    .then(r=>r.json())
    .then(r=>{
      this.setState({
        location: r
        })
      }
    )
  }

  fetchPosts = () =>{
     fetch(`${url}/posts`)
     .then(r=>r.json())
     .then(r=>{
       this.setState({
         posts: this.setPosts(r.reverse())
       },this.setState({loading:false}))
     }
   )
  }

  setPosts=(arr)=>{
    return arr.filter(post=>{
      return post.day_id === this.props.today.id
    })
  }

 renderPosts = (arr) =>{
  return  arr.map(post=>{
      return <td><PostCard key={post.id} {...post} updatePosts={this.fetchPosts}/></td>
    })
  }

  loading(){
    return(
      <div className="chat loading">loading</div>
    )
  }

  componentDidMount(){
    this.setState({loading:true})
    this.fetchLocation()
    this.fetchPosts()
  }

  componentDidUpdate(){
    // console.log('did update', this.state.loading)
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
        fetch(`${url}/posts/${post.id}`)
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
      var i;
        for (i = 0; i < toDelete.length; i++) {
          fetch(`${url}/posts/${toDelete[i].id}`,{
            method: "DELETE"
          })
        }
    }

    handleBird=(e)=>{
      e.preventDefault()
      let bird = birds[Math.floor(Math.random()*birds.length)];
        fetch(`${url}/posts`, {
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
      }


render(){
  return (
      <Fragment>
        <ActionCableConsumer
          channel={{ channel: 'LocationTwoFeedChannel'}}
          onReceived={post=>this.addPost(post)}
        />
        <div className="locationTwoPostForm"><PostForm handleBird={this.handleBird} handleDelete={this.handleDelete} addPost={this.addPost} updatePosts={this.fetchPosts} location={2} /></div>
          <div className="flex-container">
          <div>{(!!this.state.loading) ? this.loading() : null}</div>
          {this.renderPosts(this.state.newPosts)}
          {this.renderPosts(this.state.posts)}
        </div>
      </Fragment>
    );
  }
}

// function Sound(src) {
// this.sound = document.createElement("audio")
// this.sound.src = src
// this.sound.setAttribute("preload", "auto")
// this.sound.setAttribute("controls", "none")
// this.sound.style.display = "none"
// document.body.appendChild(this.sound)
// }
//
// Sound.prototype.play = function(){
// this.sound.play();
// }
//
// Sound.prototype.stop = function(){
// this.sound.pause();
// }

function mapStateToProps(state) {
  return {
    today:state.today,
    location:state.activeLocation,
    currentUser: state.currentUser

  }
}

const HOC = connect(mapStateToProps)
export default HOC(LocationTwo);
