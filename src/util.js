function hoge(str) {
  return 'hoge' + str;
}

function piyo(str) {
  return hoge(str) + 'piyo';
}

export function crash(str) {
  throw new Error(piyo(str));
}

export function sendBeacon(url, data) {
  if ('undefined' !== typeof navigator.sendBeacon) {
    return navigator.sendBeacon(url, data);
  }

  var Request = /*@cc_on @if (@_jscript_version < 10) window.XDomainRequest || @end @*/ window.XMLHttpRequest;
  if ('undefined' === typeof Request) {
    return flase
  }

  var xhr = new Request();

  xhr.open("POST", url, true);
  xhr.send(data);

  return true;
}

export function uuidv4() {
  var crypto = window.crypto || window.msCrypto;

  if (('undefined' !== typeof crypto) && crypto.getRandomValues) {
    // Use window.crypto API if available
    var arr = new Uint16Array(8);
    crypto.getRandomValues(arr);

    // set 4 in byte 7
    arr[3] = arr[3] & 0xFFF | 0x4000;
    // set 2 most significant bits of byte 9 to '10'
    arr[4] = arr[4] & 0x3FFF | 0x8000;

    var pad = function(num) {
      var v = num.toString(16);
      while (v.length < 4) {
        v = '0' + v;
      }
      return v;
    };

    return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) +
      pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
  } else {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0,
        v = c === 'x' ? r : r&0x3|0x8;
      return v.toString(16);
    });
  }
}

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

var v8regexp = /at(.*) \(?(.+):(\d+):(\d+)/g
var ffregexp = /(.*)@(.+):(\d+):(\d+)/g
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

      var filename = m[2];
      //if (filename.endsWith('.js')) {
      //  filename = filename + ':' + m[3] + ':' + m[4];
      //}

      frames.unshift({
        function: funcname,
        filename: filename,
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
