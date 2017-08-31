'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env]['dataBase'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

let db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (/\.\w+?$/.exec(file)[0] == '.js') && (file !== 'index.js');
  })
  .forEach(function (file) {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;

module.exports = db;