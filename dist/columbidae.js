(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ColumbidaeJS = factory());
}(this, (function () { 'use strict';

function sendBeacon(url, data) {
  if ('undefined' !== typeof navigator.sendBeacon) {
    return navigator.sendBeacon(url, data);
  }

  var Request = /*@cc_on @if (@_jscript_version < 10) window.XDomainRequest || @end @*/ window.XMLHttpRequest;
  if ('undefined' === typeof Request) {
    return flase;
  }

  var xhr = new Request();

  xhr.open("POST", url, true);
  xhr.send(data);

  return true;
}

// it's not able to extaract from IE8 and IE9
function extractException(err) {
  var stacktrace = null;
  if ('string' === typeof err.stack) {
    stacktrace = parseStack(err.stack);
  }

  return {
    type: 'Error',
    value: err.message,
    stacktrace: stacktrace
  };
}

var v8regexp = /at(.*) \(?(.+):(\d+):(\d+)/g;
var ffregexp = /(.*)@(.+):(\d+):(\d+)/g;
function parseStack(stack) {
  var frames = [];
  [v8regexp, ffregexp].forEach(function(r){
    if (frames.length > 0) {
      return;
    }

    var m = null;
    while((m = r.exec(stack)) != null) {
      var funcname = m[1].trim();
      if (funcname.length == 0) {
        funcname = '?';
      }

      frames.unshift({
        function: funcname,
        filename: m[2],
        lineno: parseInt(m[3]),
        colno: parseInt(m[4])
      });
    }
  });

  if (frames.length == 0) {
    return null;
  }

  return { frames: frames };
}

var version = "0.1.0";

function Sentry(config) {
  // memo: IE8 @_jscript_version == 5.8, IE10 @_jscript_version == 10
  // Sentry.io supports https only.
  // - XDomainRequest can not send to different protocol. 
  // - XMLHttpRequest on Edge v15 can not send to different protocol. 
  /*@cc_on
  @if (@_jscript_version < 5.8) throw new Error('This library does not support IE8-'); @end
  @if (@_jscript_version < 10) if (window.location.protocol !== 'https:') throw new Error('Sentry.io supports https only'); @end
  @*/

  if ('undefined' === typeof config.uuidv4) {
    throw new Error('uuidv4 is required');
  }

  this.start = (new Date()).getTime();
  this.uuidv4 = config.uuidv4;
  this.sendBeacon = config.sendBeacon;
  this.url = "//sentry.io/api/" + config.projectId + "/store/"
    + "?sentry_version=7"
    + "&sentry_client=ColumbidaeJS%2F" + version
    + "&sentry_key=" + config.key;
  this.payload = {
    project: config.projectId,
    logger: 'javascript',
    platform: 'javascript',
    request: {
      headers: {
        'User-Agent': navigator.userAgent,
      },
      url: window.location.href
    },
    exception: {
      values: []
    },
    extra: {
      'session:duration': 0
    }
  };
}

Sentry.prototype.send = function(err) {
  var id = this.uuidv4();
  this.payload.exception.values.push(extractException(err));
  this.payload.extra['session:duration'] = (new Date()).getTime() - this.start;
  this.payload.event_id = id;

  sendBeacon(this.url, JSON.stringify(this.payload));
  return id;
};

//export Stackdriver from './stackdriver'
var main = {
  Sentry: Sentry
};

return main;

})));
//# sourceMappingURL=columbidae.js.map
