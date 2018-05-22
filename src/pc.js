/*
    打包pc端入口 npm run build:pc
*/
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import routes from 'ROUTER/pc-routes.js'
import store from './assets/js/vuex/index.js'
import './assets/js/config/init_pc.js'
import { isObject } from 'UTILS/utils.js'

Vue.config.productionTip = false

const router = new Router({
    routes: routes
})

router.beforeEach((to, from, next) => {
    // 每次进入新页之前，都会对是否登录进行验证
    axios.post('/islogin').then(res => {
        // 用户已登录，如果不是进入到login页，则跳转到当前页
        // 否则就直接进入到首页
        if (isObject(res.data)) {
            if (to.name !== 'login') {
                window.bdUser = res.data
                next()
            } else {
                next('/index')
            }
        } else {
            if (to.name === 'login') {
                window.bdUser = null
                next()
            } else {
                next('/login')
            }
        }
    }).catch(e => {
        // 用户未登录，如果是进入到login页，就直接进入到当前页面
        // 否则会直接跳转到login页
        if (to.name === 'login') {
            window.bdUser = null
            next()
        } else {
            next('/login')
        }
    })
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
