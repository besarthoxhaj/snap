'use strict';

const nodemon = require('nodemon');
const notifier = require('node-notifier');

nodemon({
  script: 'tests/runner.js',
  ignore: '/dirTests/*',
}).on('restart', () => {

  if (process.stdout.isTTY) {
    process.stdout.write('\u001b[2J');
    process.stdout.write('\u001b[1;1H');
    process.stdout.write('\u001b[3J');
  }

  console.log('RESTARTING TESTS\n');
}).on('crash', () => {
  notifier.notify('Tests failed');
});
