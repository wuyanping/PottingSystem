// =============================顶层组件====================================
// ---------------------------最顶层组件----------------------------------
// const index = resolve => require(['VIEWS/index.vue'], resolve)
import index from 'VIEWS/index.vue'

// ---------------------------登录组件----------------------------------
// const login = resolve => require(['VIEWS/login.vue'], resolve)
import login from 'VIEWS/login.vue'

// ---------------------------404----------------------------------
// const notFound = resolve => require(['VIEWS/404.vue'], resolve)
import notFound from 'VIEWS/404.vue'

// ---------------------------首页----------------------------------
// const userInfo = resolve => require(['PAGE/top/components/userInfo.vue'], resolve)
// const model = resolve => require(['PAGE/model/model.vue'], resolve)

import userInfo from 'PAGE/top/components/userInfo.vue'
import model from 'PAGE/model/model.vue'

let routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        children: [
            {
                path: '/index',
                alias: '/',
                name: 'index',
                component: userInfo
            },
            {
                path: '/index/userInfo',
                alias: '/',
                name: 'userInfo',
                component: userInfo
            },
            {
                path: '/index/:module/:model',
                name: 'model',
                component: model
            },
            {
                path: '/index/:module/:model/:id',
                name: 'detailModel',
                component: model
            }
            // ,
            // {
            //     path: '/:module/:model/:id',
            //     name: 'detailModel',
            //     component: model
            // },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/*',
        name: 'notFound',
        component: notFound
    }
]

export default routes
