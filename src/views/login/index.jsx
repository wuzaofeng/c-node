import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import { setUser } from '../../model/action/user';
import * as api from '../../server/api';

class Login extends Component {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.textInput.value;
    this.getToken(value);
  }

  getToken = (token) => {
    api.postAccessToken(token).then(res => {
      if (res.success) {
        message.success('登录成功', () => {
          this.props.setUser({
            token,
            avatar_url: res.avatar_url,
            id: res.id,
            loginname: res.loginname,
          });
          this.props.history.push('/');
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <form>
              <input type="text" placeholder="输入Access Token" name="token" ref={input=>{this.textInput = input}} />
              <button type="submit" onClick={this.handleSubmit}>登录</button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
