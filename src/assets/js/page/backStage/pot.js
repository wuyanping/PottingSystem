/*
盆栽管理
 */
import ElSelect from 'COMPONENTS/public/commonElSelect.vue'
// import formAjaxElSelect from 'COMPONENTS/public/commonFormAjaxElSelect.vue'
import ElSwitch from 'COMPONENTS/public/commonElSwitch.vue'
import ElButton from 'COMPONENTS/public/commonElButton.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'
import ElInput from 'COMPONENTS/public/commonElInput.vue'
import ElInputDynamic from 'COMPONENTS/public/commonElInputDynamic.vue'
import TableDetailLink from 'COMPONENTS/public/commonTableDetailLink.vue'
import commonElPopver from 'COMPONENTS/public/commonElPopver.vue'

import selfaddPassPottingDialog from './components/selfAddPassPottingDialog.vue'
import selfVarietySelect from './components/selfVarietySelect.vue'
import selfVarietyValue from './components/selfVarietyValue.vue'

import validtor from 'UTILS/validator.js'
import { ajax } from 'UTILS/ajax.js'
import { isArray, isObject, isString } from 'UTILS/utils.js'

function getVarietyFn (vm) {
    return new Promise(resolve => {
        ajax.call(vm, 'get', `/api/variety`, data => {
            resolve(data)
        })
    })
}

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['field']] = item['value']
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
            [item['field']]: JSON.stringify(obj)
        }
    } else {
        return {
            [item['field']]: null
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

const pot = {
    // 是否显示设置
    hasTitleBack: false,
    hasTabs: false,
    hasConditionStatusSelect: true,
    hasConditionSearch: true,
    hasConditionAdd: false,
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: true,
    hasTableOperationEdit: true,
    hasTableOperationDelete: true,
    hasPaginationBatchDestroy: true,
    // 默认条件搜索的占位符 和hasConditionSearch连用
    defaultConditionSearchPlaceholder: '盆栽名称',
    // 标题*
    commonTitle: '盆栽管理',
    // 标签页
    commonTabs: {
        lists: [
            {
                display_name: '盆栽管理',
                name: 'pot'
            }
        ]
    },
    // 添加自定义组件插槽
    // commonTitleBeforeComponent: '',
    // commonTabsBeforeComponent: '',
    // 每个标签页的数据
    panelData: {
        pot: {
            // 条件刷选
            commonConditionComponents: [
                // {
                //     component: ElSelect,
                //     props: {
                //         field: 'rfid',
                //         value: undefined,
                //         title: '盆栽通过状态',
                //         lists: [
                //             {
                //                 label: '请选择',
                //                 value: undefined
                //             },
                //             {
                //                 label: '通过',
                //                 value: 0
                //             },
                //             {
                //                 label: '不通过',
                //                 value: 1
                //             }
                //         ]
                //     }
                // },
                {
                    component: ElInput,
                    props: {
                        field: 'variety',
                        value: undefined,
                        placeholder: '品种'
                    }
                },
                {
                    component: ElInput,
                    props: {
                        field: 'habit',
                        value: undefined,
                        placeholder: '生长习性'
                    }
                },
                {
                    component: ElInput,
                    props: {
                        field: 'origin',
                        value: undefined,
                        placeholder: '产地'
                    }
                }
            ],
            // 条件操作按钮
            // commonOperationComponents: [],
            // 表格列
            commonTableField: [
                {
                    label: '盆栽名称',
                    field: 'name',
                    width: '80',
                    component: TableDetailLink,
                    props: {
                        className: 'lightHigh',
                        detailUrl: 'detailModel',
                        current: 'watering'
                    }
                },
                {
                    label: '品种',
                    field: 'variety'
                },
                {
                    label: '生长习性',
                    field: 'habit'
                },
                {
                    label: '产地',
                    field: 'origin'
                },
                {
                    label: '用途',
                    field: 'use_for'
                },
                {
                    label: '外观',
                    field: 'imgs',
                    component: commonElPopver,
                    props: {
                        detailUrl: 'detailModel',
                        current: 'watering'
                    }

                },
                {
                    label: '负责人',
                    field: 'main'
                },
                {
                    label: '其他信息',
                    field: 'info'
                },
                {
                    label: '状态',
                    field: 'cstatus',
                    sortable: 'custom',
                    component: ElSwitch
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            tableFieldFn: function (data) {
                // 处理性别
                const g = function (gender) {
                    return gender === 1 ? '女' : '男'
                }

                // 处理数组变成字符串
                const arrStr = function (arr) {
                    let arrString = ''
                    if (isArray(arr)) {
                        arrString = arr.join()
                    }
                    return arrString
                }

                // 处理json字符串变成字符串
                const strObj = function (str) {
                    let arrString = ''
                    if (str) {
                        let json = JSON.parse(str)
                        if (isObject(json)) {
                            for (let key in json) {
                                arrString += `${key}： ${json[key]} ； `
                            }
                        }
                    }
                    return arrString
                }

                // 处理状态，根据有无rfid
                const statusFn = function (rfid) {
                    if (rfid) {
                        return 1
                    } else {
                        return 0
                    }
                }

                if (isArray(data)) {
                    data.forEach(v => {
                        v.gender = g(v.gender)
                        v.main = arrStr(v.main)
                        v.info = strObj(v.info)
                        v.status = statusFn(v.rfid)
                    })
                }
                if (isObject(data)) {
                    data.main = arrStr(data.main)
                    data.info = strObj(data.info)
                    data.status = statusFn(data.rfid)
                }
                return data
            },
            // 表格的操作
            commonTableOperationComponents: [
                // {
                //     component: ElButton,
                //     props: {
                //         type: 'text',
                //         loading: false,
                //         disabled: false,
                //         className: '',
                //         display_name: '通过',
                //         clickFn: (vm, scope) => {
                //             vm.$emit('customEv', { type: 'pass', ...scope })
                //         }
                //     }
                // }
            ],
            // 分页操作组件
            commonPaginationOperationComponents: [],
            // 分页设定
            commonPaginationSetting: {
                className: '',
                layout: 'total, prev, pager, next, jumper'
            },
            // 自定义操作按钮父组件回调 包含
            // commonOperationComponents
            // commonTableOperationComponents
            // commonPaginationOperationComponents
            customOperationFn: {
                // pass (vm, msg) {
                //     vm.$refs['addPassPottingDialog'].visible = true
                // }
            },

            // 默认表单域
            commonFormFieldsFn () {
                return [
                    {
                        component: 'ElInput',
                        field: 'name',
                        label: '盆栽名称',
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        // 默认 required: true,
                        // 根据rules传入的方法数据动态设置验证方法
                        rules: [
                            // {
                            //     method: 'checkValid',
                            //     trigger: 'blur',
                            //     params: {
                            //         cfield: 'name'
                            //     }
                            // }
                        ],
                        value: null
                    },
                    // {
                    //     component: formAjaxElSelect,
                    //     field: 'variety',
                    //     label: '品种',
                    //     // // 是否可搜索
                    //     filterable: true,
                    //     // // 是否允许用户创建新条目，需配合 filterable 使用
                    //     allowCreate: true,
                    //     value: null,
                    //     getDataFn: getVarietyFn
                    // },
                    {
                        // component: selfVarietySelect,
                        component: 'ElInput',
                        field: 'variety',
                        label: '品种',
                        // // 是否可搜索
                        // filterable: true,
                        // // 是否允许用户创建新条目，需配合 filterable 使用
                        // allowCreate: true,
                        value: null
                    },
                    {
                        // cascade: true, // 存在受表单其他值影响
                        // cascadeField: 'variety',
                        // component: selfVarietyValue,
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'habit',
                        label: '生长习性',
                        // filterable: true,
                        // allowCreate: true,
                        value: null
                    },
                    {
                        // cascade: true, // 存在受表单其他值影响
                        // cascadeField: 'variety',
                        // component: selfVarietyValue,
                        component: 'ElInput',
                        field: 'origin',
                        label: '产地',
                        // filterable: true,
                        // allowCreate: true,
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        value: null
                    },
                    {
                        // cascade: true, // 存在受表单其他值影响
                        // cascadeField: 'variety',
                        // component: selfVarietyValue,
                        component: 'ElInput',
                        field: 'use_for',
                        label: '用途',
                        // filterable: true,
                        // allowCreate: true,
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        value: null
                    },
                    {
                        component: Uploader,
                        field: 'imgs',
                        label: '外观',
                        required: false,
                        value: null,
                        customSerializeFn: customSerializeFn
                    },
                    // {
                    //     component: 'ElInput',
                    //     field: 'main',
                    //     label: '负责人',
                    //     rules: [],
                    //     value: null
                    // },
                    {
                        component: ElInputDynamic,
                        field: 'info',
                        label: '其他信息',
                        required: false,
                        value: [],
                        customSerializeFn: customSerializeParamsValue,
                        customEditFn: customEditParamsValue
                    },
                    {
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'memo',
                        label: '备注',
                        required: false,
                        value: null
                    }
                ]
            },
            // 添加自定义组件插槽
            // commonConditionBeforeComponent: '',
            // commonTableBeforeComponent: '',
            // commonPaginationBeforeComponent: '',
            commonCustomDialog: {
                // ref: 'addPassPottingDialog',
                // component: selfaddPassPottingDialog
            }
        }
    }
}

module.exports = {
    pot: pot
}
