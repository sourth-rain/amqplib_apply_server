'use strict';

const getAnnouncement = require('../service/getAnnouncement');
const queueService = require('../service/mq');
const Queue = new queueService('reqQueue', {});
const QueueOther = new queueService('resQqueue', {});

let actMqTask = function () {
  Queue.consume(function (data) {
    if (!data) {
      throw ('队列绑定失败！');
    }
    return getAnnouncement.getAnnouncement().then(function (result) {
      if (!result) {
        throw ('获取消息失败！');
      }
      console.log(result.length);
      return QueueOther.sendToQueue(result).then(function (data) {
        if (!data) {
          throw ('消息发送失败！');
        }
        console.log('消息发送成功！');
        return;
      })
    })
  })
}

actMqTask();
