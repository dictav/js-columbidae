var baseAPIUrl = "https://clouderrorreporting.googleapis.com/v1beta1/projects/";

function genV8StackMessage(err) {
  var message = err.stack.toString();
  console.log(message);
  return message;
}

function StackDriver(config) {
  this.url = baseAPIUrl + config.projectId + "/events:report?key=" + config.key;
  this.payload = {
    serviceContext: {
      // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext
      // resourceType is set automatically for incoming errors and must not be set when reporting errors. 
      service: config.service,
      version: config.version
    },
    context: {
      httpRequest: {
        userAgent: window.navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer,

      }
    }
  }
}

StackDriver.prototype.send = function(err) {
  this.payload.message = genV8StackMessage(err);

  if (navigator.sendBeacon) {
    navigator.sendBeacon(this.url, JSON.stringify(this.payload))
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', this.url, true);
  xhr.send(JSON.stringify(this.payload));
}

export default StackDriver;
