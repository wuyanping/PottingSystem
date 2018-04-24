// =============================顶层组件====================================
// ---------------------------最顶层组件----------------------------------
const index = resolve => require(['WAPVIEWS/index.vue'], resolve)

// ---------------------------登录组件----------------------------------
const login = resolve => require(['WAPVIEWS/login.vue'], resolve)

// ---------------------------404----------------------------------
const notFound = resolve => require(['VIEWS/404.vue'], resolve)

// ---------------------------首页----------------------------------
const potting = resolve => require(['WAPVIEWS/potting/potting.vue'], resolve)
const myPotting = resolve => require(['WAPVIEWS/myPotting/myPotting.vue'], resolve)
const userInfo = resolve => require(['WAPVIEWS/userInfo/userInfo.vue'], resolve)

// --------------------------- 详情页 ----------------------------------
const pottingDetail = resolve => require(['WAPVIEWS/potting/pottingDetail.vue'], resolve)

let routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        children: [
            {
                path: '/index/potting',
                alias: '/',
                name: 'potting',
                component: potting
            },
            {
                path: '/index/myPotting',
                name: 'myPotting',
                component: myPotting
            },
            {
                path: '/index/userInfo',
                name: 'userInfo',
                component: userInfo
            },
            {
                path: '/index/potting/:id',
                name: 'pottingDetail',
                component: pottingDetail
            }
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
