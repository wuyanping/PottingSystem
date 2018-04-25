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
const details = resolve => require(['WAPVIEWS/components/page/details.vue'], resolve)
const detailsDetails = resolve => require(['WAPVIEWS/components/page/detailsDetails.vue'], resolve)
const leader = resolve => require(['WAPVIEWS/components/page/leader.vue'], resolve)

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
            // 详情页路由
            {
                path: '/index/:model/:id',
                name: 'details',
                component: details
            },
            // 详情页的详情页路由
            {
                path: '/index/:model/:id/node',
                name: 'node',
                component: detailsDetails
            },
            {
                path: '/index/:model/:id/water',
                name: 'water',
                component: detailsDetails
            },
            {
                path: '/index/:model/:id/fertilizer',
                name: 'fertilizer',
                component: detailsDetails
            },
            {
                path: '/index/:model/:id/order',
                name: 'order',
                component: detailsDetails
            },
            {
                path: '/index/:model/:id/leader',
                name: 'leader',
                component: leader
            },
            {
                path: '/index/:model/:id/invite',
                name: 'invite',
                component: detailsDetails
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
