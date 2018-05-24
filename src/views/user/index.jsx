import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history, Link } from 'react-router-dom';
import { Avatar, Badge, Collapse, List } from 'antd';
import { getUserDetail } from '../../model/action/user';
import * as tools from '../../js/tools';
import * as api from '../../server/api';

const Panel = Collapse.Panel;

class User extends Component {
  state = {
    collectData: [],
  }
  componentDidMount() {
    if (!this.props.login) {
      this.props.history.push('/login');
      return;
    }
    this.props.getUserDetail(this.props.loginname);
    this.getUserCollect(this.props.loginname);
  }
  getUserCollect = (loginname) => {
    api.getUserCollect(loginname).then((res) => {
      this.setState({
        collectData: res.data,
      });
    });
  }

  render() {
    const { avatar_url, create_at, githubUsername, score, recent_replies, recent_topics } = this.props;
    const titleArray = [{
      title: '用户所收藏的主题',
      data: this.state.collectData,
    }, {
      title: '最近创建的话题',
      data: recent_replies,
    }, {
      title: '最近参与的话题',
      data: recent_topics,
    }]
    console.log(titleArray);
    return (
      <div style={{ textAlign: 'center' }}>
        <span style={{ marginRight: 24 }}>
          <Badge count={1}><Avatar size="large" shape="square" icon="user" src={avatar_url} /></Badge>
          <p> 积分：{score} <br /> 注册时间：{tools.formatPassTime(create_at)}<br /> githubUsername：{githubUsername} </p>
        </span>
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

