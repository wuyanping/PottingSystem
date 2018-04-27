let userInfoDetail = {
    editUserInfo: {
        title: '修改个人信息',
        // 介绍列表
        formField: function () {
            return [
                {
                    component: 'x-input',
                    label: '时间',
                    field: 'date',
                    iconType: '',
                    rule: {required: true},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: 'dd'
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
                    label: '时间',
                    field: 'date',
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
