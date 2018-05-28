import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import Subject from '../../components/subject';
import * as api from '../../server/api';

class Edit extends Component {
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
    this.getTopicsDetail();
  }

  getTopicsDetail = () => {
    const { id } = this.props.location.state;
    const { token } = this.props;
    api.getTopicsDetail(id, token).then(res => {
      this.setState({
        tab: res.data.tab,
        name: res.data.title,
        text: res.data.content,
      });
    });
  }

  onClickHandle = (data) => {
    const { currentInput, currentSelect, currentText } = data;
    const { id } = this.props.location.state;
    const { token } = this.props;
    api.postTopicsUpdate({
      accesstoken: token,
      topic_id: id,
      title: currentInput,
      tab: currentSelect,
      content: currentText,
    }).then(res => {
      if (res.success) {
        message.success('修改成功', () => {
          this.props.history.push('/user');
        });
      }
    });
  }

  render () {
    const { tab, name, text } = this.state;
    return (
      <div>
        {
          tab && (<Subject
            tab={tab}
            name={name}
            text={text}
            onClickHandle={(data) => {this.onClickHandle(data)}}
          />)
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
