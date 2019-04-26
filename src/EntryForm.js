import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'


class EntryForm extends Component {

  state= {
    title: '',
    content: '',
    characters:500,
    postForm: false
  }

  handleSubmit = (e) => {
      e.preventDefault();
      fetch('https://lemon-town-api.herokuapp.com/entries', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          content: this.state.content,
          user_id:this.props.currentUser.id
        })
      }).then(r=>r.json())
        .then(r=>this.props.updateEntries())
        this.setState({
          content: ''
        });
      }
  //
  handleChange = (e) => {
    this.setState({content: e})
    console.log(this.state.content)
  }

  modules = {
    toolbar: toolbarOptions
  }

render() {
    return (
      <div className="text-editor">
        {(!!this.state.new)
          ?
          <form onSubmit={this.handleSubmit}>
          <ReactQuill value={this.state.content}
                      onChange={this.handleChange}
                      theme="snow"
                      modules={this.modules}
                      />
        <button className="newEntrySubmit" type="submit" value="!" style={{float:"right"}}>!</button>
        <button classname="newEntryButton" onClick={()=>this.setState({new:!this.state.new})}>
        {(!!this.state.new) ? "x" : "?"}
        </button>

        </form>
          :
          <button classname="newEntryButton" onClick={()=>this.setState({new:!this.state.new})}>
          {(!!this.state.new) ? "x" : "?"}
          </button>
        }
      </div>
    )
  }
}


var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': ['#873939', '#0554A2', '#5167A4', '#37A8AC', '#6CC475','#D8D801', '#F2B8F6'] }],          // dropdown with defaults from theme
  [{ 'font': ['sans serif', 'monospace', 'serif'] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

const HOC = connect(mapStateToProps)
export default HOC(EntryForm);
