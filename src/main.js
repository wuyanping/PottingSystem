import Vue from 'vue'
import App from './App'
import router from 'ROUTER'
import './assets/js/config/init.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
