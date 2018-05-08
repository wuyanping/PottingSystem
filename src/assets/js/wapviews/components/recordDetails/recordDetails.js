import leader from '../page/leader.vue'

function listItemClickFn (vm) {
    vm.isShowPopup = true
}

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
    obj[item['name']] = item['value'].join()
    return obj
}

let model = {
    potting: {
        node: {
            title: '节点记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            // 介绍列表
            introduceListField: [
                {
                    label: '时间',
                    field: 'date'
                },
                {
                    label: '天气',
                    field: 'weather'
                },
                {
                    label: '盆栽状态',
                    field: 'status'
                },
                {
                    label: '外观',
                    field: 'imgs'
                },
                {
                    label: '记录',
                    field: 'record'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ]
        },
        watering: {
            title: '浇水记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            introduceListField: [
                {
                    label: '浇水方式',
                    field: 'content'
                },
                {
                    label: '浇水量',
                    field: 'value'
                },
                {
                    label: '浇水时间',
                    field: 'date'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ]
        },
        fertilizer: {
            title: '施肥记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            introduceListField: [
                {
                    label: '施肥名称',
                    field: 'content'
                },
                {
                    label: '施肥量',
                    field: 'value'
                },
                {
                    label: '施肥时间',
                    field: 'date'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ]
        },
        order: {
            title: '其他操作记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            introduceListField: [
                {
                    label: '操作名称',
                    field: 'content'
                },
                {
                    label: '操作时间',
                    field: 'date'
                },
                {
                    label: '操作信息',
                    field: 'info'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ]
        },
        leader: {
            title: '负责人',
            _hasCustomComponent: true,
            CustomComponent: leader
        },
        invite: {
            title: '申请/邀请',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        }
    },
    myPotting: {
        node: {
            title: '节点记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            // 介绍列表
            introduceListField: [
                {
                    label: '时间',
                    field: 'date'
                },
                {
                    label: '天气',
                    field: 'weather'
                },
                {
                    label: '盆栽状态',
                    field: 'status'
                },
                {
                    label: '外观',
                    field: 'imgs'
                },
                {
                    label: '记录',
                    field: 'record'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            formField: function () {
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
            }
        },
        watering: {
            title: '浇水记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            introduceListField: [
                {
                    label: '浇水方式',
                    field: 'content'
                },
                {
                    label: '浇水量',
                    field: 'value'
                },
                {
                    label: '浇水时间',
                    field: 'date'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ]
        },
        fertilizer: {
            title: '施肥记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            introduceListField: [
                {
                    label: '施肥名称',
                    field: 'content'
                },
                {
                    label: '施肥量',
                    field: 'value'
                },
                {
                    label: '施肥时间',
                    field: 'date'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ]
        },
        order: {
            title: '其他操作记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc'],
            introduceListField: [
                {
                    label: '操作名称',
                    field: 'content'
                },
                {
                    label: '操作时间',
                    field: 'date'
                },
                {
                    label: '操作信息',
                    field: 'info'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ]
        },
        leader: {
            title: '负责人',
            _hasCustomComponent: true,
            CustomComponent: leader
        },
        invite: {
            title: '申请/邀请',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        }
    }
    // ,
    // userInfo: {
    // }
}
export default model
