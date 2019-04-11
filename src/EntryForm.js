import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill, Toolbar } from 'react-quill'
import renderHTML from 'react-render-html'


class EntryForm extends Component {

  state= {
    title: '',
    content: '',
    characters:500
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
        <form onSubmit={this.handleSubmit}>
          <ReactQuill value={this.state.content}
                      onChange={this.handleChange}
                      theme="snow"
                      modules={this.modules}
                      // formats={this.formats}
                      />
        <input type="submit" value="post" />
      </form>
    </div>
  )}
}

// EntryForm.modules = {
//   toolbar: [
//     [{ 'header': '1'}, {'header': '2'}, { 'font': Font.whitelist }],
//     [{size: []}],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{'list': 'ordered'}, {'list': 'bullet'},
//      {'indent': '-1'}, {'indent': '+1'}],
//     ['link', 'image', 'video'],
//     ['clean']
//   ]
// }
// /*
//  * Quill editor formats
//  * See https://quilljs.com/docs/formats/
//  */
// EntryForm.formats = [
//   'header', 'font', 'size',
//   'bold', 'italic', 'underline', 'strike', 'blockquote',
//   'list', 'bullet', 'indent',
//   'link', 'image', 'video'
// ]
//
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': ['maroon', 'steelblue'] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': ['monospace', 'serif'] }],
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
