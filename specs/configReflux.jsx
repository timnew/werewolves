'use strict';

const Reflux = require('reflux');

Reflux.setEventEmitter(require('events').EventEmitter);
Reflux.setPromise(require('bluebird'));

class AsyncScheduler {
  constructor() {
    this.scheduledFunctors = [];
  }
  schedule(functor) {
    this.scheduledFunctors.push(functor);
  }
  reload() {
    const result = this.scheduledFunctors;

    this.scheduledFunctors = [];

    return result;
  }
  execute() {
    const functors = this.reload();

    return Promise.reduce(functors, (_, functor) => {      
          functor();
        }, null);
  }
}

global.Scheduler = new AsyncScheduler();

Reflux.nextTick(Scheduler.schedule.bind(Scheduler));
