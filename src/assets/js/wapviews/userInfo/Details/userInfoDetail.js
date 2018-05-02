// userInfoDetail 修改个人信息 和 修改密码 的

// 特殊处理value
function specialHandlingValue (options, value) {
    console.log(options)
    let oItem = options.find(oItem => {
        return oItem.key === value
    })
    console.log(oItem)
    return oItem.value
}

function defaultDate () {
    let date = new Date()
    let dDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return dDate
}
let userInfoDetail = {
    editUserInfo: {
        title: '修改个人信息',
        // 介绍列表
        formField: function () {
            return [
                {
                    component: 'x-input',
                    name: 'name',
                    title: '用户名',
                    iconType: '',
                    rule: {required: true},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                },
                {
                    component: 'x-input',
                    name: 'nickname',
                    title: '用户昵称',
                    iconType: '',
                    rule: {required: true},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                },
                {
                    component: 'x-input',
                    name: 'phone',
                    title: '手机号',
                    iconType: '',
                    rule: {required: true, type: 'phones'},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                },
                {
                    component: 'x-input',
                    name: 'email',
                    title: '电子邮箱',
                    iconType: '',
                    rule: {required: false, type: 'reEmail'},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                },
                {
                    component: 'x-input',
                    name: 'realname',
                    title: '真实姓名',
                    iconType: '',
                    rule: {required: false},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                },
                {
                    component: 'radio',
                    name: 'gender',
                    title: '性别',
                    iconType: '',
                    rule: {required: false},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    specialHandlingValue: specialHandlingValue,
                    options: [
                        {
                            key: 0,
                            value: '男'
                        },
                        {
                            key: 1,
                            value: '女'
                        }
                    ],
                    value: 0
                },
                {
                    component: 'datetime',
                    name: 'birth_date',
                    title: '出生日期',
                    iconType: '',
                    rule: {required: false},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: defaultDate()
                },
                {
                    component: 'x-input',
                    name: 'memo',
                    title: '备注',
                    iconType: '',
                    rule: {required: true},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                }
            ]
        }
    },
    editPassword: {
        title: '修改密码',
        // 介绍列表
        formField: function () {
            return [
                {
                    component: 'x-input',
                    name: 'pwd',
                    title: '原始密码',
                    iconType: '',
                    rule: {required: true},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                },
                {
                    component: 'x-input',
                    name: 'resetPwd',
                    title: '重置密码',
                    iconType: '',
                    rule: {required: true},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                }
            ]
        }
    }
}

export default userInfoDetail
