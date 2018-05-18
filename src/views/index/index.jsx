import React, { Component } from 'react';
import { Menu, Row, Col } from 'antd';
import { Link, Route } from 'react-router-dom';

import * as api from '../../server/api';

import All from '../all';
import Ask from '../ask';
import Good from '../good';
// import Share from '../share';
// import Job from '../job';
// import Dev from '../dev';

export default class Index extends Component {
  state = {
    indexCurrent: 'all',
    data: [],
  };

  handleClick = (e) => {
    this.setState({
      indexCurrent: e.key,
    }, () => {
      this.fetchData(e.key);
    });
  }

  fetchData = (tab) => {
    api.getTopics({
      page: 1,
      tab,
      limit: 10,
      mdrender: false,
    }).then(res => res);
  }

  componentWillMount() {
    this.fetchData(this.state.indexCurrent);
  }

  render() {
    const { match } = this.props;
    const { indexCurrent, data } = this.state;

    const url = {
      all: `${match.url}/all`,
      good: `${match.url}/good`,
      ask: `${match.url}/ask`,
      share: `${match.url}/share`,
      job: `${match.url}/job`,
      dev: `${match.url}/dev`,
    }
    return (
      <div className="wrap">
        <Row>
          <Col md={6}>
            <Menu
              className="index-menu"
              selectedKeys={[indexCurrent]}
              onClick={this.handleClick}
            >
              <Menu.Item key="all">
                <Link to={url.all}>全部</Link>
              </Menu.Item>
              <Menu.Item key="good">
                <Link to={url.good}>精华</Link>
              </Menu.Item>
              <Menu.Item key="ask">
                <Link to={url.ask}>问题</Link>
              </Menu.Item>
              <Menu.Item key="share">
                <Link to={url.share}>分享</Link>
              </Menu.Item>
              <Menu.Item key="job">
                <Link to={url.job}>招聘</Link>
              </Menu.Item>
              <Menu.Item key="dev">
                <Link to={url.dev}>测试</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col md={18}>
            <Route path={url.all} component={All} data={data} />
            <Route path={url.good} component={Good} data={data} />
            <Route path={url.ask} component={Ask} data={data} />
            {/*<Route path={url.share} component={Share} />*/}
            {/*<Route path={url.job} component={Job} />*/}
            {/*<Route path={url.dev} component={Dev} />*/}
          </Col>
        </Row>
      </div>
    );
  }
}
