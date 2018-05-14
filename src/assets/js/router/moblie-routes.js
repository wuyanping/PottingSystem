// =============================顶层组件====================================
// ---------------------------最顶层组件----------------------------------
const index = resolve => require(['WAPVIEWS/index.vue'], resolve)

// ---------------------------登录组件----------------------------------
const login = resolve => require(['WAPVIEWS/login.vue'], resolve)

// ---------------------------404----------------------------------
const notFound = resolve => require(['VIEWS/404.vue'], resolve)

// ---------------------------首页----------------------------------
const model = resolve => require(['WAPVIEWS/components/model/model.vue'], resolve)

// --------------------------- 一级详情页 ----------------------------------
const details = resolve => require(['WAPVIEWS/components/details/details.vue'], resolve)

// --------------------------- 二级详情页 ----------------------------------
const recordDetails = resolve => require(['WAPVIEWS/components/recordDetails/recordDetails.vue'], resolve)

// --------------------------- 盆栽管理 ----------------------------------
const potManage = resolve => require(['WAPVIEWS/userInfo/Details/potManage.vue'], resolve)

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
            {
                path: '/index/userInfo/potManage',
                name: 'potManage',
                component: potManage
            },
            // 详情页路由
            {
                path: '/index/:model/:id',
                name: 'details',
                component: details
            },
            // 详情页的详情页路由
            {
                path: '/index/:model/:id/:record',
                name: 'record',
                component: recordDetails
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
