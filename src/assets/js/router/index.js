import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'COMPONENTS/HelloWorld'

// const Index = resolve => require(['VIEWS/index.vue'], resolve)

const index = resolve => {
    // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
    // （代码分块）
    require.ensure(['VIEWS/index.vue'], () => {
        resolve(require('VIEWS/index.vue'))
    })
}

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/index',
            name: 'index',
            component: index
        }
    ]
})
