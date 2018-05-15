import userInfo from '../../userInfo/userInfo.vue'

function listItemClickFn (vm, panelItem) {
    vm.$router.push(`${vm.$route.path}/${panelItem.id}`)
}

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['name']] = item['value']
    return obj
}

function customSerializeParamsValue (item) {
    let obj = {}
    item.value.forEach(pv => {
        if (pv.param === '') return false
        obj[pv.param] = pv.value
    })
    if (Object.keys(obj).length > 0) {
        return {
            [item['name']]: JSON.stringify(obj)
        }
    } else {
        return {
            [item['name']]: null
        }
    }
}

function customEditParamsValue (value) {
    if (value) {
        let params_value = JSON.parse(value), arr = []
        Object.keys(params_value).forEach(param => {
            arr.push({
                param: param,
                value: params_value[param]
            })
        })
        arr.push({
            param: '',
            value: ''
        })
        return arr
    } else {
        return [{
            param: '',
            value: ''
        }]
    }
}

let model = {
    potting: {
        title: '盆栽列表',
        // 是否显示搜索
        hasConditonSelect: false,
        // 是否列表
        hasList: true,
        // 别表点击的之后执行的方法
        listItemClickFn: listItemClickFn,
        // commonConditionComponents: [],
        // 列表列 必须需要这些字段
        commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
        formField: function () {
            return [
                {
                    component: 'x-input',
                    name: 'name',
                    title: '盆栽名称',
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
                    name: 'variety',
                    title: '品种',
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
                    name: 'habit',
                    title: '生长习性',
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
                    name: 'origin',
                    title: '产地',
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
                    name: 'use_for',
                    title: '用途',
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
                    title: '其他信息',
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
                },
                {
                    component: 'file',
                    name: 'imgs',
                    title: '外观',
                    iconType: '',
                    rule: {required: false},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: '',
                    customSerializeFn: customSerializeFn
                }
            ]
        }
    },
    myPotting: {
        title: '我的盆栽',
        hasConditonSelect: true,
        hasList: true,
        listItemClickFn: listItemClickFn,
        // commonConditionComponents: []，
        commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
        // 新建表单
        formField: function () {
            return [
                {
                    component: 'x-input',
                    name: 'name',
                    title: '盆栽名称',
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
                    name: 'variety',
                    title: '品种',
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
                    name: 'habit',
                    title: '生长习性',
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
                    name: 'origin',
                    title: '产地',
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
                    name: 'use_for',
                    title: '用途',
                    iconType: '',
                    rule: {required: true},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: ''
                },
                {
                    component: 'inputDynamic',
                    name: 'info',
                    title: '其他信息',
                    iconType: '',
                    rule: {required: false},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: [],
                    customSerializeFn: customSerializeParamsValue,
                    customEditFn: customEditParamsValue
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
                },
                {
                    component: 'file',
                    name: 'imgs',
                    title: '外观',
                    iconType: '',
                    rule: {required: false},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: '',
                    customSerializeFn: customSerializeFn
                }
            ]
        }
    },
    userInfo: {
        _hasCustomComponent: true,
        CustomComponent: userInfo,
        title: '个人信息',
        // 新建表单
        formField: function () {
            return [
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
                    value: ''
                }
            ]
        },
        // 介绍列表
        introduceListField: [
            {
                label: '用户名',
                field: 'name'
            },
            {
                label: '用户昵称',
                field: 'nickname'
            },
            {
                label: '手机号',
                field: 'phone'
            },
            {
                label: '电子邮箱',
                field: 'email'
            },
            {
                label: '真实姓名',
                field: 'realname'
            },
            {
                label: '性别',
                field: 'gender'
            },
            {
                label: '出生日期',
                field: 'birth_date'
            },
            {
                label: '备注',
                field: 'memo'
            }
        ]
    }
}
export default model
