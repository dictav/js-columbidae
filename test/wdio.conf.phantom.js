'use strict'
const base = require('./_wdio.conf')

exports.config = Object.assign(base.config, {
  capabilities: [
    {
      browserName: 'phantomjs'
    }
  ],
  services: ['phantomjs'],
  onPrepare: _ => require('./server')
})
