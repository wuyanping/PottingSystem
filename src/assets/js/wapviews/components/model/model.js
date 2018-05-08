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
        commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
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
        }
    }
}
export default model
