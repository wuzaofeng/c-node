import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  state = {};
  handleClick = (e) => {
    this.props.navClick(e.key);
  }
  render() {
    const { mode, className, theme, current } = this.props;
    return (
      <Menu
        className={className}
        mode={mode}
        theme={theme}
        selectedKeys={[current]}
        onClick={this.handleClick}
      >
        <Menu.Item key="home">
          <Link to="/home"><Icon type="home" />首页</Link>
        </Menu.Item>
        <Menu.Item key="book">
          <Link to="/book"><Icon type="book" />教程</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about"><Icon type="info-circle" />关于</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
