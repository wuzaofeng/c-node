import request from './request';
import config from '../config';

export function getTopics(data) { // 主题首页
  return request(`${config.BASEURL}/topics`, data);
}

export function getTopicsDetail(id) { // 主题详情
  return request(`${config.BASEURL}/topic/${id}`);
}
