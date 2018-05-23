import React, { Component } from 'react';
import { Layout } from 'antd';
import './footer.scss';

const { Footer } = Layout;

export default class FooterWrap extends Component {
  state = {};
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</Footer>
    );
  }
}
