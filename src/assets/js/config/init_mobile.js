// 引入Sass样式
import 'SASS/index'

import utils from '../utils/vuePrototype.js'

// 引入下拉刷新插件
import BScroll from 'better-scroll'

// 引入字体
import '../iconfont/iconfont.css'

// 注册全局方法
Vue.use(utils)

// html字体大小设置
require('./fontSize.js')
