import request from './request';
import config from '../config';

// 主题
export function getTopics(data) { // 主题首页
  return request(`${config.BASEURL}/topics`, data);
}

export function getTopicsDetail(id, token = '') { // 主题详情
  return request(`${config.BASEURL}/topic/${id}`, { accesstoken: token });
}

export function postTopics(data) { // 新建主题
  // accesstoken, title, tab, content
  return request(`${config.BASEURL}/topics`, data, 'post');
}

export function postTopicsUpdate (data) { // 编辑主题
  // accesstoken, topic_id ,title, tab, content
  return request(`${config.BASEURL}/topics/update`, data, 'post');
}

// 主题收藏
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

// 评论
export function getNewReplies(data) { // 新建评论
  // accesstoken, content, reply_id
  const { topic_id, content, token, reply_id } = data;
  const params = {
    content,
    accesstoken: token,
  }
  if (reply_id) {
    params.reply_id = reply_id;
  }
  return request(`${config.BASEURL}/topic/${ topic_id }/replies`, params, 'post');
}

export function getReplies(data) { // 为评论点赞
  // accesstoken, reply_id
  return request(`${config.BASEURL}/reply/${data.reply_id}/ups`, { accesstoken: data.token }, 'post')
}

// 用户
export function getUserDetails(loginname) { // 用户详情
  return request(`${config.BASEURL}/user/${loginname}`);
}

export function postAccessToken(accesstoken) { // 登陆 验证 accessToken 的正确性
  return request(`${config.BASEURL}/accesstoken`, { accesstoken }, 'post');
}

// 消息通知
export function getMessageCount(data) { // 获取未读消息数
  return request(`${config.BASEURL}/message/count`, { accesstoken: data.token });
}
//
export function getMessage(data) { // 获取已读和未读消息
  // accesstoken
  // mdrender (可选)
  return request(`${config.BASEURL}/messages`, { accesstoken: data.token });
}
//
export function postMessageMarkAll(data) { // 标记全部已读
  // accesstoken
  return request(`${config.BASEURL}/message/mark_all`, data, 'post');
}

export function postMessageMarkOne(data) { // 标记单个消息为已读
  // accesstoken
  // msg_id
  return request(`${config.BASEURL}/message/mark_one/${data.msg_id}`,{ accesstoken: data.accesstoken }, 'post');
}