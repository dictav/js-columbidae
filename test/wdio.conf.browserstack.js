'use strict'
const ngrok = require('ngrok')

const base = require('./_wdio.conf')
const buildId = 'build-' + Date.now().toString()
var capabilities = [
//  // Chrome
//  { browser: 'chrome', os: 'OS X', os_version: 'El Capitan' },
//  { browser: 'chrome', version: '55', os: 'Windows', os_version: '10' },
//  { browser: 'chrome', version: '50', os: 'Windows', os_version: '8' },
//  { browser: 'chrome', version: '45', os: 'Windows', os_version: 'xp' },
//
//  // Firefox 
//  { browser: 'firefox', os: 'OS X', os_version: 'El Capitan' },
//  { browser: 'firefox', version: '50', os: 'Windows', os_version: '10' },
//  { browser: 'firefox', version: '45', os: 'Windows', os_version: '7' },
//  { browser: 'firefox', version: '40', os: 'Windows', os_version: 'xp' },

  // IE
  // This library does not support < IE8
  // { browser: 'ie', version: '7.0', os: 'Windows', os_version: 'xp'},
  { browser: 'ie', version: '8.0', os: 'Windows', os_version: '7'},
//  { browser: 'ie', version: '9.0', os: 'Windows', os_version: '7'},
//  { browser: 'ie', version: '10.0', os: 'Windows', os_version: '7'},
//  { browser: 'ie', version: '11.0', os: 'Windows', os_version: '10' },
//
//  // Edge
//  { browser: 'edge', version: '14', os: 'Windows', os_version: '10' },
//  { browser: 'edge', version: '15', os: 'Windows', os_version: '10' },

  // Safari
//  { browser: 'safari', version: '9.1', os: 'OS X', os_version: 'El Capitan'},
//  { browser: 'safari', version: '10.0', os: 'OS X', os_version: 'Sierra'},

//  // iOS Simulator
//  { browser: 'iphone', os_version: '7.0', device: 'iPhone 5S'},
//  { browser: 'iphone', os_version: '8.3', device: 'iPhone 6'},
//  { browser: 'iphone', os_version: '9.1', device: 'iPhone 6S'},
//
//  // Android Emulator
//  { browser: 'android', os_version: '4.4', device: 'HTC One M8'},
//  { browser: 'android', os_version: '5.0', device: 'Google Nexus 5'},

  // Real iOS device
  // { browser: 'safari', device: 'iPhone 7', realMobile: 'true' },
  // { browser: 'safari', device: 'iPhone 7 Plus', realMobile: 'true' },
  // { browser: 'chrome', device: 'iPhone 7', realMobile: 'true' },
  // { browser: 'firefox', device: 'iPhone 7 Plus', realMobile: 'true' },

  // Real Android device
  // { browser: 'chrome', device: 'Samsung Galaxy S6', realMobile: 'true' },
  // { browser: 'chrome', device: 'Samsung Galaxy S7', realMobile: 'true' },
  // { browser: 'chrome', os_version: '6.0', device: 'Samsung Galaxy Note 4', realMobile: 'true' },
  // { browser: 'chrome', device: 'Samsung Galaxy Tab 4', realMobile: 'true' },
  // { browser: 'chrome', device: 'Google Nexus 5', realMobile: 'true' },
  // { browser: 'chrome', device: 'Google Nexus 6', realMobile: 'true' },
  // { browser: 'chrome', device: 'Google Nexus 9', realMobile: 'true' },
  // { browser: 'chrome', os_version: '7.1', device: 'Google Pixel', realMobile: 'true' },
  // { browser: 'firefox', os_version: '7.1', device: 'Google Pixel', realMobile: 'true' },
].map(a => {
  a.build = buildId
  a.resolution = '1024x768'
  a['browserstack.timezone'] = 'UTC'
  a['browserstack.video'] = false
  a['browserstack.debug'] = true
  return a
})

exports.config = Object.assign(base.config, {
  //logLevel: 'result',
  //logOutput: 'test/log',
  //coloredLogs: false,
  maxInstances: 5, // cloud service's limit
  capabilities: capabilities,
  services: ['browserstack'],
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  // Code to start browserstack local before start of test
  onPrepare: (config, capabilities) => {
    require('./server')
    console.log("Connecting local");

    return new Promise((resolve, reject) => {
      ngrok.connect(3000, (err, url) => {
        if (err) {
          reject(err)
        }
        process.env.URL1 = url
        resolve()
      })
    });
  }
})
