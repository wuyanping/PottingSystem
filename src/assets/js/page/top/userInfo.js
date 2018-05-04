/*
用户信息
 */
// import ElSelect from '../../../../public/components/commonElSelect.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'

const userInfo = {
    commonFormFieldsFn () {
        return [
            {
                component: 'ElInput',
                field: 'name',
                label: '用户名',
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
            {
                component: 'ElInput',
                field: 'nickname',
                label: '用户昵称',
                rulesType: [
                    {
                        max: 255,
                        message: '最多有255字',
                        trigger: 'blur'
                    }
                ],
                rules: [],
                value: null
            },
            {
                component: 'ElInput',
                field: 'phone',
                label: '手机号',
                rules: [
                    {
                        method: 'phoneValid',
                        params: {}
                    }
                ],
                value: null
            },
            {
                component: Uploader,
                field: 'avatar',
                label: '头像',
                required: false,
                value: null
            },
            {
                component: 'ElInput',
                field: 'email',
                label: '电子邮箱',
                required: false,
                rulesType: [
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'change'
                    },
                    {
                        max: 255,
                        message: '最多有255字',
                        trigger: 'blur'
                    }
                ],
                rules: [],
                value: null
            },
            {
                component: 'ElInput',
                field: 'realname',
                label: '真实姓名',
                required: false,
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
                component: 'ElRadio',
                field: 'gender',
                label: '性别',
                required: false,
                value: 0,
                radioList: [
                    {
                        name: '男',
                        id: 0
                    },
                    {
                        name: '女',
                        id: 1
                    }
                ]
            },
            {
                component: 'ElDate',
                field: 'birth_date',
                label: '出生日期',
                required: false,
                value: null
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
    }
}

module.exports = userInfo
