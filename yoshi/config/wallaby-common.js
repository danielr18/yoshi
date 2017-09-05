module.exports = function (wallaby) {
  process.env.NODE_PATH += `:${require('path').join(wallaby.localProjectDir, 'node_modules')}`;
  return {
    files: [
      {pattern: 'src/templates/**', instrument: false},
      {pattern: 'test/**/*.spec.[j|t]s', ignore: true},
      {pattern: 'test/**/*.spec.[j|t]sx', ignore: true},
      {pattern: 'test/**/*.e2e.[j|t]s', ignore: true},
      {pattern: 'src/**/*.spec.[j|t]s', ignore: true},
      {pattern: 'src/**/*.spec.[j|t]sx', ignore: true},
      {pattern: 'src/assets/**', instrument: false},
      {pattern: 'src/**', instrument: true},
      {pattern: 'target/**/*.json', instrument: false},
      {pattern: 'templates/**', instrument: false},
      {pattern: 'index.js', instrument: true},
      {pattern: 'package.json', instrument: false},
      {pattern: 'tsconfig.json', instrument: false},
      {pattern: 'pom.xml', instrument: false},
      'testkit/**/*.[j|t]s',
      'test/**/*.[j|t]s',
      'test/**/*.[j|t]sx',
      'src/**/*.scss'
    ],

    tests: [
      {pattern: 'test/**/*.spec.[j|t]s'},
      {pattern: 'test/**/*.spec.[j|t]sx'},
      {pattern: 'src/**/*.spec.[j|t]s'},
      {pattern: 'src/**/*.spec.[j|t]sx'},
    ],

    compilers: {
      '**/*.js{,x}': wallaby.compilers.babel({
        babelrc: true,
        plugins: [
          require.resolve('babel-plugin-transform-es2015-modules-commonjs')
        ]
      })
    },

    env: {
      type: 'node',
      params: {
        env: `SRC_PATH=./src;NODE_ENV=test;WIX_NODE_BUILD_WATCH_MODE=true;`
      }
    },
    workers: {
      initial: 1,
      regular: 1,
      recycle: true
    }
  };
};
