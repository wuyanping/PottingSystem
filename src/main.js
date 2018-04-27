import Vue from 'vue'
import App from './App'
import router from 'ROUTER'
import store from './assets/js/vuex/index.js'
import './assets/js/config/init.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     store
//     components: { App },
//     template: '<App/>'
// })

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
