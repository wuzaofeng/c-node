import React, { Component } from 'react';
import { List, Avatar, Spin, Icon, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import * as tools from '../../js/tools';
import * as api from '../../server/api';
import './details.scss';

const confirm = Modal.confirm;
class detail extends Component {
  state = {
    data: {},
    loading: true,
    isCollect: false,
  };


  componentDidMount () {
    this.setState({
      loading: true,
    }, () => {
      this.getTopicsDetail();
      this.getUserCollect();
    });
  }

  componentWillUnmount() {
    this.setState({
      data: {},
      loading: true,
      isCollect: false,
    });
  }

  getTopicsDetail = () => {
    const params = {
      id: this.props.match.params.id,
    }
    if (this.props.login) {
      params.token = this.props.token;
    }
    api.getTopicsDetail(params.id, params.token).then(res => {
      this.setState({
        data: res.data,
        loading: false,
      });
    });
  }

  getUserCollect = () => {
    if (this.props.login) {
      api.getUserCollect(this.props.loginname).then((res) => {
        if (!res.data.length) {
          return;
        }
        const isCollect = res.data.filter(value => value.id === this.props.match.params.id).length != 0 ? true: false;
        this.setState({
          isCollect,
        });
      });
    }
  }

  toggCollect = () => {
    const { isCollect, data } = this.state;
    const { id } = data;
    const { token } = this.props;
    if (!this.props.login) {
      const _this = this;
      confirm({
        title: '需要登录',
        content: '需要登录',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          _this.props.history.push('/login');
        },
        onCancel() {},
      });
    } else {
      api.postToggCollext(token, id, !isCollect).then((res) => {
        if (res.success) {
          this.setState({
            isCollect: !isCollect,
          });
        }
      });
    }
  }

  toggReplieUp = (id) => {
    if (!this.props.login) {
      const _this = this;
      confirm({
        title: '需要登录',
        content: '需要登录',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          _this.props.history.push('/login');
        },
        onCancel() {},
      });
    } else {
      api.getReplies({
        token: this.props.token,
        reply_id: id,
      }).then(res => {
        this.getTopicsDetail();
      });
    }
  }

  render() {
    const { loading, data, isCollect } = this.state;
    const {
      content,
      top,
      title,
    } = data;

    const IconText = ({ type, text, onClick }) => (
      <span onClick={onClick}>
        <Icon
          type={type}
          style={{ marginRight: 8 }}
        />
        {text}
      </span>);

    return (
      <div styleName="content">
        {
          loading ? (<Spin />) : (
            <div>
              <h2>{top && <i style={{ fontSize: '13px' }}>置顶</i>}{title}</h2>
              <p>发布时间：{tools.formatPassTime(data.create_at)} &nbsp;
              作者：{data.author.loginname}&nbsp; {data.visit_count}次浏览 最后一次编辑是
                {tools.formatPassTime(data.last_reply_at)} 来自 分享
              </p>
              {
                !isCollect ?
                  (<Button onClick={this.toggCollect}>收藏</Button>) :
                  (<Button onClick={this.toggCollect}>取消收藏</Button>)
              }
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={data.replies}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <IconText
                        type={item.is_uped ? 'like' : 'like-o'}
                        text={item.ups.length}
                        onClick={() =>{this.toggReplieUp(item.id)}}
                      />,
                      <IconText type="message" />]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.author.avatar_url} />}
                      title={item.author.loginname}
                    />
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </List.Item>
                )}
              />
            </div>
          )
        }
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(detail);
