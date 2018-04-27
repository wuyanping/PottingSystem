// =============================顶层组件====================================
// ---------------------------最顶层组件----------------------------------
const index = resolve => require(['WAPVIEWS/index.vue'], resolve)

// ---------------------------登录组件----------------------------------
const login = resolve => require(['WAPVIEWS/login.vue'], resolve)

// ---------------------------404----------------------------------
const notFound = resolve => require(['VIEWS/404.vue'], resolve)

// ---------------------------首页----------------------------------
// const potting = resolve => require(['WAPVIEWS/potting/potting.vue'], resolve)
// const myPotting = resolve => require(['WAPVIEWS/myPotting/myPotting.vue'], resolve)
// const userInfo = resolve => require(['WAPVIEWS/userInfo/userInfo.vue'], resolve)
// const commonMain = resolve => require(['WAPVIEWS/components/page/commonMain.vue'], resolve)

const model = resolve => require(['WAPVIEWS/model.vue'], resolve)

// --------------------------- 一级详情页 ----------------------------------
// const pottingDetail = resolve => require(['WAPVIEWS/potting/pottingDetail.vue'], resolve)
// const commonDetails = resolve => require(['WAPVIEWS/components/page/commonDetails.vue'], resolve)
// const userInfoDetail = resolve => require(['WAPVIEWS/userInfo/Details/userInfoDetail.vue'], resolve)
const details = resolve => require(['WAPVIEWS/details.vue'], resolve)

// --------------------------- 二级详情页 ----------------------------------
// const detailsDetails = resolve => require(['WAPVIEWS/components/page/detailsDetails.vue'], resolve)
// const leader = resolve => require(['WAPVIEWS/components/page/leader.vue'], resolve)

const recordDetails = resolve => require(['WAPVIEWS/recordDetails.vue'], resolve)

let routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        children: [
            {
                path: '/index/:model',
                name: 'model',
                component: model
            },
            // {
            //     path: '/index/potting',
            //     alias: '/',
            //     name: 'potting',
            //     component: basic
            // },
            // {
            //     path: '/index/myPotting',
            //     name: 'myPotting',
            //     component: basic
            // },
            // {
            //     path: '/index/userInfo',
            //     name: 'userInfo',
            //     component: userInfo
            // },
            // 详情页路由
            {
                path: '/index/:model/:id',
                name: 'details',
                component: details
            },
            // {
            //     path: '/index/potting/:id',
            //     name: 'pottingDetails',
            //     component: commonDetails
            // },
            // {
            //     path: '/index/myPotting/:id',
            //     name: 'myPottingDetails',
            //     component: commonDetails
            // },
            // {
            //     path: '/index/userInfo/:model',
            //     name: 'userInfoDetail',
            //     component: userInfoDetail
            // },
            // 详情页的详情页路由
            {
                path: '/index/:model/:id/:record',
                name: 'record',
                component: recordDetails
            }
            // {
            //     path: '/index/:model/:id/node',
            //     name: 'node',
            //     component: detailsDetails
            // }
            // {
            //     path: '/index/:model/:id/water',
            //     name: 'water',
            //     component: detailsDetails
            // },
            // {
            //     path: '/index/:model/:id/fertilizer',
            //     name: 'fertilizer',
            //     component: detailsDetails
            // },
            // {
            //     path: '/index/:model/:id/order',
            //     name: 'order',
            //     component: detailsDetails
            // },
            // {
            //     path: '/index/:model/:id/leader',
            //     name: 'leader',
            //     component: leader
            // },
            // {
            //     path: '/index/:model/:id/invite',
            //     name: 'invite',
            //     component: detailsDetails
            // }
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
