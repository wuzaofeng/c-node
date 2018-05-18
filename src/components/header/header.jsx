import React, { Component } from 'react';
import { Layout, Row, Col, Divider, Icon, Dropdown, Button } from 'antd';
import Nav from '../nav';
import './header.scss';

const { Header } = Layout;

export default class HeaderWrap extends Component {
  state = {
    current: 'home',
  };
  itemClick = (key) => {
    this.setState({ current: key });
  }
  render() {
    const { current } = this.state;
    return (
      <Header>
        <Row className="wrap">
          <Col md={6} xs={24}>
            <h1 className="logo">cNode</h1>
          </Col>
          <Col md={18} xs={0} className="nav-wrap">
            <Divider type="vertical" className="header-divider" />
            <Nav current={current} className="nav" mode="horizontal" theme="dark" navClick={e => this.itemClick(e)} />
          </Col>
          <Col md={0} xs={24} className="xs-nav">
            <Dropdown
              overlay={<Nav
                current={current}
                className="nav1"
                mode="vertical"
                navClick={e => this.itemClick(e)}
              />}
              placement="bottomRight"
              trigger={['click', 'touchend']}
            >
              <Button><Icon type="bars" /></Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    );
  }
}
