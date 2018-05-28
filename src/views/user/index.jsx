import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history, Link } from 'react-router-dom';
import { Avatar, Badge, Collapse, List, Row, Col, Tabs, Button, message } from 'antd';
import { getUserDetail } from '../../model/action/user';
import * as tools from '../../js/tools';
import * as api from '../../server/api';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class User extends Component {
  state = {
    collectData: [],
    count: 0,
    currentReadIndex: 0,
    has_read_messages: [],
    hasnot_read_messages: [],
  }
  componentDidMount() {
    const { login, history, loginname, token} = this.props;
    if (!login) {
      history.push('/login');
      return;
    }
    this.props.getUserDetail(loginname);
    this.getUserCollect(loginname);
    this.getMessageCount({ token });
    this.getMessage({ token });
  }

  getUserCollect = (loginname) => {
    api.getUserCollect(loginname).then((res) => {
      this.setState({
        collectData: res.data,
      });
    });
  }

  getMessageCount = (data) => {
    api.getMessageCount(data).then((res) => {
      this.setState({
        count: res.data,
      });
    });
  }

  getMessage = (data) => {
    api.getMessage(data).then((res) => {
      const { has_read_messages, hasnot_read_messages} = res.data;
      this.setState({
        has_read_messages,
        hasnot_read_messages,
      });
    });
  }

  postMessageMarkOne = (id) => {
    const { token } = this.props;
    const params = {
      accesstoken: token,
      msg_id: id,
    }
    api.postMessageMarkOne(params).then((res) => {
      if (res.success) {
        message.success('标记已读成功', () => {
          this.getMessage({ token });
        });
      }
    });
  }

  postMessageMarkAll = () => {
    const { token } = this.props;
    api.postMessageMarkAll({ accesstoken: token }).then((res) => {
      console.log(res);
      if (res.success) {
        message.success('全部标记已读', ()=> {
          this.getMessage({ token });
        });
      }
    });
  }

  render() {
    const { avatar_url, create_at, githubUsername, score, recent_replies, recent_topics } = this.props;
    const titleArray = [{
      title: '用户所收藏的主题',
      data: this.state.collectData,
    }, {
      title: '最近创建的主题',
      data: recent_topics,
    }, {
      title: '最近参与的主题',
      data: recent_replies,
    }]

    const readyArray = [{
      title: '已读信息',
      data: this.state.has_read_messages,
      ready: true,
    }, {
      title: '未读信息',
      data: this.state.hasnot_read_messages,
      ready: false,
    }]
    return (
      <div>
        <Row>
          <Col xs={24} style={{ textAlign: 'center' }} >
            <span style={{ marginRight: 24 }}>
              <Badge count={this.state.count}>
                <Avatar size="large" shape="square" icon="user" src={avatar_url} />
              </Badge>
              <p> 积分：{score} <br /> 注册时间：{tools.formatPassTime(create_at)}<br /> githubUsername：{githubUsername} </p>
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={12}>
            <Collapse accordion>
              {
                titleArray.map((item, i) => (
                  <Panel header={item.title} key={i}>
                    <List
                      dataSource={item.data}
                      renderItem={list => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar src={list.author.avatar_url} />}
                            title={<Link to={`/home/${list.id}`} href={`/home/${list.id}`}>
                              {list.author.loginname}</Link>}
                            description={list.title}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                ))
              }
            </Collapse>
          </Col>
          <Col xs={24} md={12}>
            { this.state.hasnot_read_messages.length > 0 && (<Button onClick={this.postMessageMarkAll }>全部已读</Button>) }
            <Tabs defaultActiveKey={this.state.currentReadIndex}>
              {
                readyArray.map((item, i) => (
                  <TabPane tab={item.title} key={i}>
                    <List
                      itemLayout="horizontal"
                      dataSource={item.data}
                      renderItem={list => (
                        <List.Item
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={list.author.avatar_url} />}
                            title={
                              <Link to={`/home/${list.topic.id}`} href={`/home/${list.topic.id}`}>
                                {list.author.loginname}
                              </Link>}
                            description={list.topic.title}
                          />
                          {item.ready ?
                            (<Button size="small" disabled>已读</Button>)
                            : (<Button
                              size="small"
                              onClick={() => { this.postMessageMarkOne(list.id); }} >未读</Button>
                            )}
                        </List.Item>
                      )}
                    />
                  </TabPane>
                ))
              }
            </Tabs>
          </Col>
        </Row>
      </div>
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
    getUserDetail: loginname => dispatch(getUserDetail(loginname)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

