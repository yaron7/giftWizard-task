const Service = require('../models/service.model');

let nextIndex = 0;

class ServicesManager {
  constructor(services = []) {
    this.services = services;
    this.currentServiceHandler = services[nextIndex];
  }

  nextServiceHandler() {
    const count = this.services.length - 1;
    if (count) {
      nextIndex = nextIndex < count ? nextIndex + 1 : 0;
      this.currentServiceHandler = this.services[nextIndex];
      return this.currentServiceHandler.name;
    }
    return { service: null };
  }
}

const servicesManager = new ServicesManager([
  new Service({ name: 'service1', path: 'http://service1' }),
  new Service({ name: 'service2', path: 'http://service2' }),
  new Service({ name: 'service3', path: 'http://service3' }),
  new Service({ name: 'service4', path: 'http://service4' })
]);

module.exports = servicesManager;
