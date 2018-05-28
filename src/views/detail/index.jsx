import React, { Component } from 'react';
import { List, Avatar, Spin, Icon, Button, Modal } from 'antd';
import { history } from 'react-router-dom';
import { connect } from 'react-redux';
import * as tools from '../../js/tools';
import * as api from '../../server/api';
import './details.scss';
import Editor from '../../components/editor/editor';

const confirm = Modal.confirm;
class detail extends Component {
  state = {
    data: {},
    loading: true,
    isCollect: false,
    otherArr: [],
    text: '',
    textOnly: '',
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
      const otherArr = res.data.replies.map((item) => {
        return {
          upsNum: item.ups.length,
          is_uped: item.is_uped,
          showRepy: false,
        };
      });
      this.setState({
        data: res.data,
        loading: false,
        otherArr,
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

  toggReplieUp = (id, i) => {
    if (!this.props.login) {
      this.checkLogin();
    } else {
      api.getReplies({
        token: this.props.token,
        reply_id: id,
      }).then(res => {
        const otherArr = this.state.otherArr;
        otherArr[i].upsNum = otherArr[i].is_uped ? (otherArr[i].upsNum - 1) : (otherArr[i].upsNum + 1);
        otherArr[i].is_uped = !otherArr[i].is_uped;
        this.setState({
          otherArr,
        });
      });
    }
  }

  getNewReplies = (params) => {
    const { i, loginname} = params;
    if (!this.props.login) {
      this.checkLogin();
    } else {
      const { otherArr } = this.state;
      const stateBool = otherArr[i].showRepy;
      otherArr.map(item => {
        return item.showRepy = false
      });
      otherArr[i].showRepy = !stateBool;
      this.setState({
        otherArr,
        textOnly: `@${loginname} `,
      });
    }
  }

  toggCollect = () => {
    const { isCollect, data } = this.state;
    const { id } = data;
    const { token } = this.props;
    if (!this.props.login) {
      this.checkLogin();
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


  checkLogin = () => {
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
  }

  changeHandle = (value) => {
    this.setState({
      text: value,
    });
  }

  sendHandle = () => {
    const { text } = this.state;
    const { token } = this.props;
    const { id } = this.props.match.params;
    api.getNewReplies({content: text, token,topic_id: id}).then(res => {
      this.setState({
        text: '',
      });
      this.getTopicsDetail();
    });
  }

  changeOnlyHandle = (value) => {
    this.setState({
      textOnly: value,
    });
  }

  sendOnlyHandle = (reply_id) => {
    const { textOnly } = this.state;
    const { token } = this.props;
    const { id } = this.props.match.params;
    api.getNewReplies({content: textOnly, token, topic_id: id, reply_id}).then(res => {
      this.setState({
        textOnly: '',
      });
      this.getTopicsDetail();
    });
  }

  editHandle = (data) => {
    const { id } = data;
    const path = {
      pathname: '/edit',
      state: { id },
    }
    this.props.history.push(path);
  }

  render() {
    const { loading, data, isCollect, otherArr, text, textOnly } = this.state;
    const { login, loginname } = this.props;
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
              {
                data.author.loginname === loginname && (
                  <Button onClick={() => { this.editHandle(data); }}>编辑主题</Button>)
              }
              <div dangerouslySetInnerHTML={{ __html: tools.escape2Html(content) }} />
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={data.replies}
                renderItem={(item, i) => (
                  <List.Item
                    key={item.title}
                    actions={
                      login && [
                        <IconText
                          type={otherArr[i].is_uped ? 'like' : 'like-o'}
                          text={otherArr[i].upsNum}
                          onClick={() =>{this.toggReplieUp(item.id, i)}}
                        />,
                        <IconText
                          type={otherArr[i].showRepy === true ? 'dribbble-square' : 'dribbble'}
                          onClick={() => {this.getNewReplies({i, loginname: item.author.loginname})}} />
                      ]
                    }
                    extra={
                      <div>
                        {
                          otherArr[i].showRepy === true && (
                            <div>
                              <Editor text={textOnly} changeHandle={(value) => { this.changeOnlyHandle(value); }} />
                              <Button onClick={ () => {this.sendOnlyHandle(item.id)}}>发送</Button>
                            </div>)
                        }
                      </div>
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.author.avatar_url} />}
                      title={item.author.loginname}
                    />
                    <div dangerouslySetInnerHTML={{ __html: tools.escape2Html(item.content) }} />
                  </List.Item>
                )}
              />
              {
                login && (
                  <div>
                    <p>添加回复</p>
                    <Editor text={text} changeHandle={(value) => { this.changeHandle(value); }} />
                    <Button onClick={this.sendHandle}>发送</Button>
                  </div>
                )
              }
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
