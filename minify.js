// https://www.npmjs.com/package/uglify-js#minify-options
var config = {
  warnings: false,

  // use default parse options 
  parse: {}, 

  // use default compress options
  compress: {}, 

  mangle: true,

  sourceMap: {
    content: "hoge.js.map",
    url: "http://localhost:4000/bundle.js.map"
  },
  toplevel: false,
  ie8: true,
}

var fs = require('fs');
var ujs = require('uglify-js');
var code = '';

var obj = JSON.parse(fs.readFileSync('./hoge.js.map', 'utf8'));
config.sourceMap.content = obj.content;

process.stdin.setEncoding('utf-8');
process.stdin.on('data', (data) => code += data);
process.stdin.on('end', _ => {
  var min = ujs.minify(code, config);
  console.log(min.code);
  fs.writeFileSync('bundle.js.map', min.map);
})
