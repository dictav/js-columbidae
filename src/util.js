
export function sendBeacon(url, data) {
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
export function extractException(err) {
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
export function parseStack(stack) {
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
  })

  if (frames.length == 0) {
    return null;
  }

  return { frames: frames };
}
