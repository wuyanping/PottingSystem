/**
 * 路由
 * @author : wuyanping
 * @date : 2018/4/23
 */
import Router from 'vue-router'

// 电脑端的路由
import PcRoutes from './pc-routes'

// 移动端的路由
import MoblieRoutes from './mobile-routes'

Vue.use(Router)

let routes
if (window.isPC) {
    routes = PcRoutes
} else {
    routes = MoblieRoutes
}

export default new Router({
    routes: routes
})
