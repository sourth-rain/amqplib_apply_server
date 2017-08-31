'use strict';

module.exports = function (sequelize, DataTypes) {
  let SyncAnnouncement = sequelize.define('SyncAnnouncement', {
    serverDataId: DataTypes.STRING,
    announcemId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    context: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    eCode: DataTypes.STRING,
    serverDataCreatedTime: DataTypes.DATE,
    serverDataUpdatedTime: DataTypes.DATE

  }, {
    freezeTableName: true,
    tableName: 'sync_announcement',
  });
  return SyncAnnouncement;
};