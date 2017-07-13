import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'

import pkg from './package.json'

var config = {
  warnings: false,

  // use default parse options 
  parse: {}, 

  // use default compress options
  compress: {}, 

  mangle: true,

  toplevel: false,
  ie8: true,
  output: {
    beautify: true,
    comments: 'some'
  }
}


export default {
  moduleName: pkg.module + 'Example',
  entry: 'src/example.js',
  dest: 'test/public/example.js',
  format: 'umd',
  sourceMap: true,
  legacy: true,
  plugins: [
    json(),
    uglify(config)
  ]
};
