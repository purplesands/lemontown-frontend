import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill, Toolbar } from 'react-quill'
import renderHTML from 'react-render-html'


class EntryForm extends Component {

  state= {
    title: '',
    content: '',
    characters:500,
    postForm: false
  }

  handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/entries', {
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
      <button classname="newEntryButton" onClick={()=>this.setState({new:!this.state.new})}>
      {(!!this.state.new) ? "x" : "?"}
      </button>
        {(!!this.state.new)
          ?
          <form onSubmit={this.handleSubmit}>
          <input className="newEntrySubmit" type="submit" value="!" />
          <ReactQuill value={this.state.content}
                      onChange={this.handleChange}
                      theme="snow"
                      modules={this.modules}
                      />
        </form>
          :
          null}
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

  [{ 'color': ['maroon', 'steelblue'] }, { 'background': [] }],          // dropdown with defaults from theme
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
