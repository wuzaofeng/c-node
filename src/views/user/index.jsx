import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { history } from  'react-router-dom';
import { Avatar, Badge } from 'antd';
import { getUserDetail } from '../../model/action/user';
import * as tools from '../../js/tools';

class User extends Component {
  state = {
    data: {},
  }
  componentDidMount() {
    // if (!this.props.login) {
    //   this.props.history.push('/login');
    //   return;
    // }
    this.props.getUserDetail('wuzaofeng');
  }
  render() {
    const { avatar_url, create_at, githubUsername, score } = this.props;
    console.log(this.props.avatar_url);
    return (
      <div style={{ textAlign: 'center' }}>
        <span style={{ marginRight: 24 }}>
          <Badge count={1}><Avatar size="large" shape="square" icon="user" src={avatar_url} /></Badge>
          <p> 积分：{score} <br/> 注册时间：{tools.formatPassTime(create_at)}<br/> githubUsername：{githubUsername}</p>
        </span>
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

