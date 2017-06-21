import { extractException } from './util'

var VERSION = '0.0.1';
var duration = 120;  // duration from start

function Sentry(config) {
  this.url = "https://sentry.io/api/" + config.projectId + "/store/"
    + "?sentry_version=7"
    + "&sentry_client=simple-reporter%2F" + VERSION
    + "&sentry_key=" + config.key
  this.payload = {
    "project": config.projectId,
    "logger": "javascript",
    "platform": "javascript",
    "request": {
      "headers": {
        "User-Agent": navigator.userAgent,
      },
      "url": window.location.href
    },
    "exception": {
      "values": []
    },
    "extra": {
      "session:duration": 0
    }
  }
}

Sentry.prototype.send = function(err) {
  this.payload.exception.values.push(extractException(err));

  if (navigator.sendBeacon) {
    navigator.sendBeacon(this.url, JSON.stringify(this.payload))
    return;
  }

  console.log('sentry', this.payload);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', this.url, true);
  xhr.send(JSON.stringify(this.payload));
}

export default Sentry;
