'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  logUrl : '"http://opinfo-kidsedu.tvmore.com.cn/log/boikgpokn78sb95kmadfng8edgllb9h7"',
})
