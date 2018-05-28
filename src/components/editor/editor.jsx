import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    // this.state = { text: '' } // You can also pass a Quill Delta here
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <ReactQuill
        value={this.props.text}
        onChange={(value) => { this.props.changeHandle(value);}}
      />
    );
  }
}
