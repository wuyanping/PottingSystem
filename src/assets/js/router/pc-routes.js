// =============================顶层组件====================================
// ---------------------------最顶层组件----------------------------------
const index = resolve => require(['VIEWS/index.vue'], resolve)

// ---------------------------登录组件----------------------------------
const login = resolve => require(['VIEWS/login.vue'], resolve)

// ---------------------------404----------------------------------
const notFound = resolve => require(['VIEWS/404.vue'], resolve)

// ---------------------------首页----------------------------------
const home = resolve => require(['PAGE/home/home.vue'], resolve)
const userInfo = resolve => require(['PAGE/top/components/userInfo.vue'], resolve)
const model = resolve => require(['PAGE/model/model.vue'], resolve)

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
                component: home
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
