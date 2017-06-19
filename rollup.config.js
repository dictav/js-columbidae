import uglify from 'rollup-plugin-uglify';

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
    comments: true
  }
}

export default {
  moduleName: 'SimpleErrorReporter',
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'umd',
  sourceMap: true,
  plugins: [
    uglify(config)
  ]
};
