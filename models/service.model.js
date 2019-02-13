const uniqid = require('uniqid');

module.exports = class Service {
  constructor({ name = '', path = '' }) {
    this.id = uniqid();
    this.name = name;
    this.path = path;
  }
};
