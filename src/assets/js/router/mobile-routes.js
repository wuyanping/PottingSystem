// =============================顶层组件====================================
// ---------------------------最顶层组件----------------------------------
// const index = resolve => require(['WAPVIEWS/index.vue'], resolve)
import index from 'WAPVIEWS/index.vue'

// ---------------------------登录组件----------------------------------
// const login = resolve => require(['WAPVIEWS/login.vue'], resolve)
import login from 'WAPVIEWS/login.vue'

// ---------------------------404----------------------------------
// const notFound = resolve => require(['VIEWS/404.vue'], resolve)
import notFound from 'VIEWS/404.vue'

// ---------------------------首页----------------------------------
// const model = resolve => require(['WAPVIEWS/components/model/model.vue'], resolve)
import model from 'WAPVIEWS/components/model/model.vue'

// --------------------------- 一级详情页 ----------------------------------
// const details = resolve => require(['WAPVIEWS/components/details/details.vue'], resolve)
import details from 'WAPVIEWS/components/details/details.vue'

// --------------------------- 二级详情页 ----------------------------------
// const recordDetails = resolve => require(['WAPVIEWS/components/recordDetails/recordDetails.vue'], resolve)
import recordDetails from 'WAPVIEWS/components/recordDetails/recordDetails.vue'

// --------------------------- 盆栽管理 ----------------------------------
// const potManage = resolve => require(['WAPVIEWS/userInfo/Details/potManage.vue'], resolve)
import potManage from 'WAPVIEWS/userInfo/Details/potManage.vue'

let routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        children: [
            {
                path: '/index/:model',
                name: 'model',
                component: model,
                meta: {
                    keepAlive: true
                }
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
