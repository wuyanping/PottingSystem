'use strict'
// 默认打包pc端
const MP = process.env.NODE_MP === 'mobile' ? 'mobile' : 'pc'

module.exports =  {
  	NODE_ENV: "'development'",
  	NODE_MP: `"${MP}"`
}
