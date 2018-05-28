# c-node
## 脚手架
   [react-pack-cli](https://www.npmjs.com/package/react-pack-cli)

## 技术栈：
    react + Antd + react-router + ES6/7/8

## 说明
    本项目是为了更加了解react全家桶，样式方面可能没有那么在乎，含请见谅
    如果觉得不错的话，您可以点右上角 "Star" 支持一下 谢谢！ ^_^
    如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

## 实战发现问题
    本项目首页原想用分页显示，但因为用的是cNode网站接口，没有返回总条数。无法确定总条数是多少。
    于是运用了点击更多加载分页。

## Cnode接口 
### 感谢来自[cnodejs论坛]( https://cnodejs.org/api )官方提供的api！

### 主题
- [X] get /topics 主题首页 [示例](https://cnodejs.org/api/v1/topics)
- [X] get /topic/:id 主题详情 [示例](https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312)
- [X] post /topics 新建主题
- [X] post /topics/update 编辑主题

### 主题收藏
- [X] post /topic_collect/collect 收藏主题
- [X] post /topic_collect/de_collect 取消主题
- [X] get /topic_collect/:loginname 用户所收藏的主题 [示例](https://cnodejs.org/api/v1/topic_collect/alsotang)

### 评论
- [X] post /topic/:topic_id/replies 新建评论
- [X] post /reply/:reply_id/ups 为评论点赞

### 用户
- [X] get /user/:loginname 用户详情 [示例](https://cnodejs.org/api/v1/user/alsotang)
- [X] post /accesstoken 验证 accessToken 的正确性

### 消息通知
- [X] get /message/count 获取未读消息数
- [X] get /messages 获取已读和未读消息
- [X] post /message/mark_all 标记全部已读
- [X] post /message/mark_one/:msg_id 标记单个消息为已读

### 问题
可能由于cnode论坛上没有消息。所以无法测试有没有信息。
所以无法测试标记单个信息为已读和标记全部已读显示问题。但接口是没问题的。能正常请求。(解决)
优化,其实可以将详情页显示的数据保存在state中，这样可以减少请求数。
使用defaultValue 需要传入参数时候要判断是否为空。不然会渲染两次。 
