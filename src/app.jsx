import React, { Component } from 'react';
import { Layout } from 'antd';

import Head from './components/header/header';
import Foot from './components/footer/footer';
import './css/main.scss'; // import global css style

const { Content } = Layout;

export default class App extends Component {
  state = {}
  render() {
    return (
      // App root node
      <div className="page-wrap">
        <Head />
        <Content className="main">
          <div className="wrap">{this.props.children}</div>
        </Content>
        <Foot />
      </div>
    );
  }
}
