import { isObject, isFunction } from 'UTILS/utils.js'
import { check } from './commonApi.js'
import { ajax } from './ajax'
module.exports = {
    // validatorFn: (name, rule, value) => {
    //     if (value === null) value = ''
    //     value = (value + '').trim()
    //     var length = value.length
    //     if (rule.required) {
    //         if (length || (length === undefined && name === 'img')) {
    //             if (rule.type) {
    //                 let bol = false
    //                 switch (rule.type) {
    //                 // 手机和固话验证
    //                 case 'phones':
    //                     bol = (value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) || (value.length === 12 && /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value))
    //                     break
    //                 // 整数
    //                 case 'reInteger':
    //                     bol = (/^\d+$/.test(value))
    //                     break
    //                 // 验证数字（包含小数）
    //                 case 'reNumber':
    //                     bol = (/^([0-9])+(\.[0-9]+)?$/.test(value))
    //                     break
    //                 // 验证邮箱
    //                 case 'reEmail':
    //                     bol = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
    //                     break
    //                 }
    //                 if (bol) {
    //                     return {
    //                         valid: bol,
    //                         msg: name + '输入正确'
    //                     }
    //                 } else {
    //                     return {
    //                         valid: bol,
    //                         msg: name + (rule.message || '格式错误')
    //                     }
    //                 }
    //             } else {
    //                 return {
    //                     valid: true,
    //                     msg: name + '必填了'
    //                 }
    //             }
    //         } else {
    //             return {
    //                 valid: false,
    //                 msg: name + '是必填的'
    //             }
    //         }
    //     } else {
    //         if (rule.type) {
    //             if (length) {
    //                 let bol = false
    //                 switch (rule.type) {
    //                 // 手机和固话验证
    //                 case 'phones':
    //                     bol = (value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) || (value.length === 12 && /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value))
    //                     break
    //                 // 整数
    //                 case 'reInteger':
    //                     bol = (/^\d+$/.test(value))
    //                     break
    //                 // 验证数字（包含小数）
    //                 case 'reNumber':
    //                     bol = (/^([0-9])+(\.[0-9]+)?$/.test(value))
    //                     break
    //                 // 验证邮箱
    //                 case 'reEmail':
    //                     bol = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
    //                     break
    //                 }
    //                 if (bol) {
    //                     return {
    //                         valid: bol,
    //                         msg: name + '输入正确'
    //                     }
    //                 } else {
    //                     return {
    //                         valid: bol,
    //                         msg: name + (rule.message || '格式错误')
    //                     }
    //                 }
    //             } else {
    //                 return {
    //                     valid: true,
    //                     msg: name + '不必填有类型还没有长度'
    //                 }
    //             }
    //         } else {
    //             return {
    //                 valid: true,
    //                 msg: name + '没有格式要求'
    //             }
    //         }
    //     }
    // },
    validatorFn: (name, rule, value, formAllData, callback) => {
        if (value === null) value = ''
        value = (value + '').trim()
        var length = value.length
        if (rule.required) {
            if (length || (length === undefined && name === 'img')) {
                if (rule.type) {
                    let bol = false
                    switch (rule.type) {
                    // 手机和固话验证
                    case 'phones':
                        bol = (value.length === 11 && /^1\d{10}$/.test(value)) || (value.length === 12 && /^0\d{2,3}-?\d{7,8}$/.test(value))
                        break
                    // 整数
                    case 'reInteger':
                        bol = (/^\d+$/.test(value))
                        break
                    // 验证数字（包含小数）
                    case 'reNumber':
                        bol = (/^([0-9])+(\.[0-9]+)?$/.test(value))
                        break
                    // 验证邮箱
                    case 'reEmail':
                        bol = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
                        break
                    }
                    if (bol) {
                        callback(null, { valid: bol, msg: name + '输入正确' })
                    } else {
                        callback(null, {
                            valid: bol,
                            msg: name + (rule.message || '格式错误')
                        })
                    }
                } else if (rule.validator) {
                    if (isFunction(rule.validator)) {
                        rule.validator(rule.params, value, formAllData, callback)
                    }
                } else {
                    callback(null, {
                        valid: true,
                        msg: name + '必填了'
                    })
                }
            } else {
                callback(null, {
                    valid: false,
                    msg: name + '是必填的'
                })
            }
        } else {
            if (rule.type) {
                if (length) {
                    let bol = false
                    switch (rule.type) {
                    // 手机和固话验证
                    case 'phones':
                        bol = (value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) || (value.length === 12 && /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value))
                        break
                    // 整数
                    case 'reInteger':
                        bol = (/^\d+$/.test(value))
                        break
                    // 验证数字（包含小数）
                    case 'reNumber':
                        bol = (/^([0-9])+(\.[0-9]+)?$/.test(value))
                        break
                    // 验证邮箱
                    case 'reEmail':
                        bol = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
                        break
                    }
                    if (bol) {
                        callback(null, {
                            valid: bol,
                            msg: name + '输入正确'
                        })
                    } else {
                        callback(null, {
                            valid: bol,
                            msg: name + (rule.message || '格式错误')
                        })
                    }
                } else {
                    callback(null, {
                        valid: true,
                        msg: name + '不必填有类型还没有长度'
                    })
                }
            } else if (rule.validator) {
                if (isFunction(rule.validator)) {
                    rule.validator(rule.params, value, callback)
                }
            } else {
                callback(null, {
                    valid: true,
                    msg: name + '没有格式要求'
                })
            }
        }
    },

    /**
     * 唯一性验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：cfield(String)
     */
    checkValid: (params = {}, value, formAllData, callback) => {
        let paramsfn = {
            field: params.field,
            value: value
        }
        if (window.bdUser) {
            paramsfn.id = window.bdUser.id
        }
        check(params.vm, params.url, paramsfn)
            .then(data => {
                let result = {
                    valid: false,
                    msg: '服务器错误'
                }
                if (data.res) {
                    result = {
                        valid: data.res,
                        msg: name + '可以使用'
                    }
                } else {
                    result = {
                        valid: data.res,
                        msg: name + (params.message || '已存在')
                    }
                }
                callback(null, result)
            })
    },

    // 验证密码
    checkPassword: (params = {}, value, formAllData, callback) => {
        let p1 = formAllData.find(item => {
            return item.name === params.field
        })
        let p2 = formAllData.find(item => {
            return item.name === params.checkField
        })
        let result = {
            valid: true,
            msg: params.field + (params.message || 'ok')
        }
        if (p2.value !== '') {
            if (p1.value === p2.value) {
                result = {
                    valid: true,
                    msg: params.field + (params.message || 'ok')
                }
            } else {
                result = {
                    valid: false,
                    msg: '密码不一致'
                }
            }
        }
        callback(null, result)
    }
}
