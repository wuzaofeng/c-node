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
        <Menu.Item key="add">
          <Link to="/add"><Icon type="file-add" />添加主题</Link>
        </Menu.Item>
        <Menu.Item key="api">
          <a target="_blank" rel="noopener noreferrer" href="https://cnodejs.org/api"><Icon type="link" />cNode Api</a>
        </Menu.Item>
      </Menu>
    );
  }
}
