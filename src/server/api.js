import request from './request';
import config from '../config';

export function getTopics(data) { // 主题首页
  return request(`${config.BASEURL}/topics`, data);
}

export function getTopicsDetail(id) { // 主题详情
  return request(`${config.BASEURL}/topic/${id}`);
}

export function postAccessToken(accesstoken) { // 登陆 验证 accessToken 的正确性
  return request(`${config.BASEURL}/accesstoken`, { accesstoken }, 'post');
}

export function getUserCollect(loginname) { // 获取用户收藏主题
  return request(`${config.BASEURL}/topic_collect/${loginname}`);
}

export function postToggCollext(accesstoken, topic_id, bool = false) { // 收藏主题和取消主题
  return request(
    `${config.BASEURL}/topic_collect/${bool ? 'collect' : 'de_collect'}`,
    { accesstoken, topic_id },
    'post',
  );
}

export function getUserDetails(loginname) { // 用户详情
  return request(`${config.BASEURL}/user/${loginname}`);
}
