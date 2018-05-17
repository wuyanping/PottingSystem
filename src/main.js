import Vue from 'vue'
import App from './App'
import router from 'ROUTER'
import store from './assets/js/vuex/index.js'
import './assets/js/config/init.js'
import { isObject } from 'UTILS/utils.js'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    let loginUrl = 'islogin'
    loginUrl = window.isPC ? 'islogin' : 'ismlogin'
    // 每次进入新页之前，都会对是否登录进行验证
    axios.post(`/${loginUrl}`).then(res => {
        // 用户已登录，如果不是进入到login页，则跳转到当前页
        // 否则就直接进入到首页
        console.log('islogin ----- ')
        console.log(res)
        if (isObject(res.data)) {
            if (to.name !== 'login') {
                console.log('ssssssssssssss')
                window.bdUser = res.data
                next()
            } else {
                if (window.isPC) {
                    next('/index')
                } else {
                    next('/index/myPotting')
                }
            }
        } else {
            if (to.name === 'login') {
                window.bdUser = null
                next()
            } else {
                next('/login')
            }
        }
    }).catch(err => {
        console.log(err)
        // 用户未登录，如果是进入到login页，就直接进入到当前页面
        // 否则会直接跳转到login页
        // if (err.response.status === 401) { //  || err.response.status === 403
        if (to.name === 'login') {
            window.bdUser = null
            next()
        } else {
            next('/login')
        }
        // alert('服务器错误，请稍后操作')
        // }
    })
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
