import assert from 'assert'
import { parseStack } from '../../src/util'

const want1 = {
  frames: [
    {
      filename: 'http://localhost:3000/trace.html',
      lineno: 12,
      colno: 16,
      function: '?'
    },
    {
      filename: 'http://localhost:3000/dist/bundle.js:4:1600',
      lineno: 4,
      colno: 1600,
      function: 'Object.e.Crash'
    },
    {
      filename: 'http://localhost:3000/dist/bundle.js:4:883',
      lineno: 4,
      colno: 883,
      function: 's'
    }
  ]
}

const tests = [
  {
    name: 'v8',
    src: "Error: hogegood-byepiyo\n    at s (http://localhost:3000/dist/bundle.js:4:883)\n    at Object.e.Crash (http://localhost:3000/dist/bundle.js:4:1600)\n    at http://localhost:3000/trace.html:12:16",
    want: want1
  },
  {
    name: 'firefox,safari',
    src: "s@http://localhost:3000/dist/bundle.js:4:883\nObject.e.Crash@http://localhost:3000/dist/bundle.js:4:1600\n@http://localhost:3000/trace.html:12:16",
    want: want1
  },
  /*
  {
    name: 'IE 9-',
    src: '',
    want: {
      type: 'Error',
      message: '',
      stacktrace: {
        frames: [
          {
            filename: '',
            lineno: 0,
            colno: 0,
            function: '?'
          }
        ]
      }
    }
  },
  {
    name: 'IE 10+',
    src: '',
    want: {
      type: 'Error',
      message: '',
      stacktrace: {
        frames: [
          {
            filename: '',
            lineno: 0,
            colno: 0,
            function: '?'
          }
        ]
      }
    }
  }
  */
]

describe('parseStack', () => {
  before(() => {})
  after(() => {})

  tests.forEach(t => {
    it(t.name, () => {
      var got = parseStack(t.src)
      assert.deepEqual(t.want, got)
    })
  })

})
