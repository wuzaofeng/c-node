import React, { Component } from 'react';
import List from '../../components/list';

export default class Ask extends Component {
  state = {};
  render() {
    return (<List data={this.props.data} />);
  }
}
