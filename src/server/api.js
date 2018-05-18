import request from './request';
import * as config from '../config';

export function getTopics(data) { // 主题首页
  return request(`${config.BASEURL}/topics`, data);
}
