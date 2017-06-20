var VERSION = '0.0.1'
var duration = 120// duration from start

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
      "values": [
        {
          "type": "Error",
          "value": 'initial message',
          "stacktrace": {
            "frames": [
              {
                "filename": "http://dictav.net/js-simple-error-reporter/index.html",
                "lineno": 17,
                "colno": 23,
                "function": "?",
                "in_app": true
              },
              {
                "filename": "http://dictav.net/js-simple-error-reporter//dist/bundle.js",
                "lineno": 4,
                "colno": 587,
                "function": "Object.e.Crash",
                "in_app": true
              }
            ]
          }
        }
      ]
    },
    "extra": {
      "session:duration": 0
    }
  }
}

Sentry.prototype.send = function(err) {
  this.payload.exception.values[0].value = err.message;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(this.url, JSON.stringify(this.payload))
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', this.url, true);
  xhr.send(JSON.stringify(this.payload));
}

export default Sentry;
