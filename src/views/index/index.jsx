import React, { Component } from 'react';
import { Menu, Row, Col, List, Avatar, Spin, Button } from 'antd';
import { withRouter, Route } from 'react-router-dom';
import * as api from '../../server/api';
import config from '../../config';
import Detail from '../detail';
import * as tools from '../../js/tools';

@withRouter
export default class Index extends Component {
  state = {
    indexCurrent: 'all',
    data: [],
    currentIndex: 1,

    loading: true,
    loadingMore: false,
    showLoadingMore: true,

    isDetail: false,
    tabLoading: true,
  };

  handleClick = (e) => {
    this.setState({
      indexCurrent: e.key,
      currentIndex: 1,
      isDetail: false,
      tabLoading: true,
    }, () => {
      this.fetchData();
    });
  }

  fetchData = () => {
    api.getTopics({
      page: this.state.currentIndex,
      tab: this.state.indexCurrent,
      limit: config.LIMIT,
      mdrender: false,
    }).then((res) => {
      this.setState({
        loading: false,
        data: res.data,
        tabLoading: false,
      });
    });
  }

  pushDetail = (id) => {
    this.setState({
      isDetail: true,
    }, () => {
      this.props.history.push(`/home/${id}`);
    });
  }

  onLoadMore = () => {
    this.setState({
      loadingMore: true,
      currentIndex: this.state.currentIndex + 1,
    }, () => {
      const beforeData = this.state.data;
      api.getTopics({
        page: this.state.currentIndex,
        tab: this.state.indexCurrent,
        limit: config.LIMIT,
        mdrender: false,
      }).then((res) => {
        this.setState({
          showLoadingMore: res.data <= config.LIMIT ? false : true,
          loadingMore: false,
          loading: false,
          data: beforeData.concat(res.data),
        });
      });
    });
  }

  componentDidMount() {
    this.fetchData(this.state.indexCurrent);
  }

  showList = () => {
    const { showLoadingMore, loadingMore, loading, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return this.state.tabLoading ? (<Spin />) : (<List
      itemLayout="horizontal"
      loading={loading}
      loadMore={loadMore}
      dataSource={data}
      renderItem={item => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.author.avatar_url} />}
            title={
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => this.pushDetail(item.id)}
              >{item.title}
              </span>}
            description={item.email}
          />
          <div>{item.top ? (<span className="top">置顶</span>) : null} {tools.formatPassTime(item.last_reply_at)}</div>
        </List.Item>
      )}
    />);
  }

  render() {
    const { indexCurrent, isDetail } = this.state;

    return (
      <Row>
        <Col md={6}>
          <Menu
            className="index-menu"
            selectedKeys={[indexCurrent]}
            onClick={this.handleClick}
          >
            <Menu.Item key="all">全部</Menu.Item>
            <Menu.Item key="good">精华</Menu.Item>
            <Menu.Item key="share">分享</Menu.Item>
            <Menu.Item key="ask">问答</Menu.Item>
            <Menu.Item key="job">招聘</Menu.Item>
            <Menu.Item key="dev">客户端测试</Menu.Item>
          </Menu>
        </Col>
        <Col md={18}>
          {
            isDetail ? (<Route path="/home/:id" component={Detail} />) : this.showList()
          }
        </Col>
      </Row>
    );
  }
}
