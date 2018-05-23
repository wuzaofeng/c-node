import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Divider, Icon, Dropdown, Button, Avatar } from 'antd';
import { connect } from 'react-redux';
import { loginOut } from "../../model/action/user";
import Nav from '../nav';
import './header.scss';

const { Header } = Layout;

class HeaderWrap extends Component {
  state = {
    current: 'home',
  };
  itemClick = (key) => {
    this.setState({ current: key });
  }
  render() {
    const { login, avatar_url } = this.props;
    const { current } = this.state;
    return (
      <Header>
        <Row className="wrap">
          <Col md={6} xs={8}>
            <h1 className="logo">cNode</h1>
          </Col>
          <Col md={14} xs={0} className="nav-wrap">
            <Divider type="vertical" className="header-divider" />
            <Nav current={current} className="nav" mode="horizontal" theme="dark" navClick={e => this.itemClick(e)} />
          </Col>
          {
            login ? (
              <Col md={4} xs={12}>
                <Link to="/user"><Avatar icon="user" size="large" src={avatar_url} /></Link>
                <Button
                  onClick={this.props.loginOut} size="small"
                  style={{ marginLeft: 16, verticalAlign: 'middle' }}>退出登录</Button>
              </Col>
            ) : (
              <Col md={4} xs={12}>
                <Link to="/login"><Button size="small">登录</Button></Link>
              </Col>
            )
          }
          <Col md={0} xs={4}>
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

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginOut: () => dispatch(loginOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrap);