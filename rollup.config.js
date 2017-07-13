import json from 'rollup-plugin-json'
//import uglify from 'rollup-plugin-uglify'

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
    comments: 'some'
  }
}

export default {
  moduleName: pkg.module,
  entry: 'src/main.js',
  dest: 'dist/columbidae.js',
  format: 'umd',
  sourceMap: true,
  legacy: true,
  plugins: [
    json(),
//    uglify(config)
  ]
};
