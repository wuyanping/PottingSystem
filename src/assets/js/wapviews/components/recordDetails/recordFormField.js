function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['name']] = item['value']
    return obj
}

function customStatus (item) {
    let obj = {}
    item['options'].forEach(v => {
        if (item['value'].join() == v.name) {
            obj[item['name']] = v.value
        }
    })
    return obj
}

let formField = {
    NodeFormField: function () {
        return [
            {
                component: 'datetime',
                name: 'date',
                title: '时间',
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
                name: 'weather',
                title: '天气',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'select',
                name: 'status',
                title: '状态',
                iconType: '',
                options: [{
                    name: '良好',
                    value: 0
                },
                {
                    name: '一般',
                    value: 1
                },
                {
                    name: '较差',
                    value: 2
                },
                {
                    name: '非常差',
                    value: 3
                }],
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: [],
                customSerializeFn: customStatus
            },
            {
                component: 'file',
                name: 'imgs',
                title: '外观',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: '',
                customSerializeFn: customSerializeFn
            },
            {
                component: 'x-input',
                name: 'record',
                title: '记录',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'x-textarea',
                name: 'memo',
                title: '备注',
                iconType: '',
                rule: {required: false},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            }
        ]
    },
    wateringField: function () {
        return [
            {
                component: 'x-input',
                name: 'content',
                title: '浇水方式',
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
                name: 'value',
                title: '浇水量',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'datetime',
                name: 'date',
                title: '浇水时间',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'x-textarea',
                name: 'memo',
                title: '备注',
                iconType: '',
                rule: {required: false},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            }
        ]
    },
    fertilizerField: function () {
        return [
            {
                component: 'x-input',
                name: 'content',
                title: '施肥名称',
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
                name: 'value',
                title: '施肥量',
                iconType: '',
                rule: {required: false},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'datetime',
                name: 'date',
                title: '施肥时间',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'x-textarea',
                name: 'memo',
                title: '备注',
                iconType: '',
                rule: {required: false},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            }
        ]
    },
    orderField: function () {
        return [
            {
                component: 'x-input',
                name: 'content',
                title: '操作名称',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'datetime',
                name: 'date',
                title: '操作时间',
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
                name: 'info',
                title: '操作信息',
                iconType: '',
                rule: {required: false},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            {
                component: 'x-textarea',
                name: 'memo',
                title: '备注',
                iconType: '',
                rule: {required: false},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            }
        ]
    }
}

export default formField
