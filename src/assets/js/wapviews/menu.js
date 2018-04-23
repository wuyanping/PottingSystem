export default [
    {
        name: '后台管理',
        key: 'backStage',
        opened: false,
        children: [
            {
                name: '用户信息管理',
                key: 'user',
                path: '/index/backStage/user'
            },
            {
                name: '盆栽管理',
                key: 'pot',
                path: '/index/backStage/pot'
            }
        ]
    },
    {
        name: '系统管理',
        key: 'system',
        opened: false,
        children: [
            {
                name: '系统管理用户管理',
                key: 'sysman',
                path: '/index/system/sysman'
            },
            {
                name: '系统日志管理',
                key: 'log',
                path: '/index/system/log'
            }
        ]
    }
]
