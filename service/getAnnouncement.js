'use strict';

const model = require('../model');
const syncAnnouncementModel = model.SyncAnnouncement;
const Promise = require('bluebird');
const syncAnnouncementModelPromise = Promise.promisifyAll(syncAnnouncementModel);

let getAnnouncement = function () {
  return new Promise((resolve, reject) => {
    let options = {
      limit: 200
    };
    syncAnnouncementModelPromise.findAll(options).then((result) => {
      if (result) {
        resolve(result);
      } else {
        resolve({});
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  getAnnouncement: getAnnouncement
};