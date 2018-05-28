import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import Subject from '../../components/subject';
import * as api from '../../server/api';

class Add extends Component {
  state = {
    select: '',
    name: '',
    text: '',
  };

  componentWillMount () {
    if (!this.props.login) {
      this.props.history.push('/login');
      return;
    }
  }

  onClickHandle = (data) => {
    const { currentInput, currentSelect, currentText } = data;
    const { token } = this.props;
    api.postTopics({
      accesstoken: token,
      title: currentInput,
      tab: currentSelect,
      content: currentText,
    }).then(res => {
      if (res.success) {
        message.success('添加成功', () => {
          this.props.history.push('/user');
        });
      }
    });
  }

  render () {
    const { select, name, text } = this.state;
    return (
      <div>
        {
          <Subject
            tab={select}
            name={name}
            text={text}
            onClickHandle={(data) => {this.onClickHandle(data)}}
          />
        }
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
