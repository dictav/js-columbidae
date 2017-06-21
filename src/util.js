function hoge(str) {
  return 'hoge' + str;
}

function piyo(str) {
  return hoge(str) + 'piyo';
}

export default function crash(str) {
  throw new Error(piyo(str));
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
