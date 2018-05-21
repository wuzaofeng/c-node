import React, { Component } from 'react';
import { List, Avatar, Spin, Icon, BackTop } from 'antd';
import * as api from '../../server/api';

export default class detail extends Component {
  state = {
    data: {},
    loading: true,
  };

  componentWillMount() {
    this.setState({
      loading: true,
    }, () => {
      api.getTopicsDetail(this.props.match.params.id).then(res => {
        this.setState({
          data: res.data,
          loading: false,
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id.substring(1);
    this.setState({
      id,
      loading: true,
    }, () => {
      api.getTopicsDetail(this.props.match.params.id).then(res => {
        this.setState({
          data: res.data,
          loading: false,
        });
      });
    });
  }

  render() {
    const { loading, data } = this.state;
    const {
      content,
      top,
      title,
    } = data;
    console.log(data);

    const IconText = ({ type, text }) => (<span><Icon type={type} style={{ marginRight: 8 }} />{text}</span>);

    return (
      <div className="content">
        {
          loading ? (<Spin />) : (
            <div>
              <h2>{top && <i style={{ fontSize: '13px' }}>置顶</i>}{title}</h2>
              <p>发布时间：{data.create_at}
              作者：{data.author.loginname} {data.visit_count}次浏览 最后一次编辑是 {data.last_reply_at} 来自 分享</p>
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={data.replies}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <IconText type="like-o" text={item.ups.length} />,
                      <IconText type="message" text="2" />]}
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
