export default [
    {
        name: '后台管理',
        key: 'backStage',
        // childrenKey: ['userInfo', 'potting'],
        // src: '/images/plant/plant.png',
        children: [
            {
                name: '用户信息管理',
                key: 'userInfo',
                path: '/index/backStage/userInfo'
            },
            {
                name: '盆栽管理',
                key: 'potting',
                path: '/index/backStage/potting'
            }
        ]
    },
    {
        name: '系统管理',
        key: 'system',
        children: [
            {
                name: '系统管理用户管理',
                key: 'systemUser',
                path: '/index/system/systemUser'
            },
            {
                name: '系统日志管理',
                key: 'log',
                path: '/index/system/log'
            }
        ]
    }
]
