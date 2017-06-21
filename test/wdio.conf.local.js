'use strict'
const base = require('./_wdio.conf')

exports.config = Object.assign(base.config, {
  capabilities: [
    {
      browserName: 'chrome'
    },
    {
      browserName: 'firefox'
    },
    {
      browserName: 'safari'
    }
  ],
  services: ['selenium-standalone']
})
