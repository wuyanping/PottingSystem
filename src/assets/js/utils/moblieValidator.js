import { isObject, isFunction } from 'UTILS/utils.js'
import { check } from './commonApi.js'
import { ajax } from './ajax'
module.exports = {
    validatorFn: (name, rule, value) => {
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
                        return {
                            valid: bol,
                            msg: name + '输入正确'
                        }
                    } else {
                        return {
                            valid: bol,
                            msg: name + (rule.message || '格式错误')
                        }
                    }
                } else {
                    return {
                        valid: true,
                        msg: name + '必填了'
                    }
                }
            } else {
                return {
                    valid: false,
                    msg: name + '是必填的'
                }
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
                        return {
                            valid: bol,
                            msg: name + '输入正确'
                        }
                    } else {
                        return {
                            valid: bol,
                            msg: name + (rule.message || '格式错误')
                        }
                    }
                } else {
                    return {
                        valid: true,
                        msg: name + '不必填有类型还没有长度'
                    }
                }
            } else {
                return {
                    valid: true,
                    msg: name + '没有格式要求'
                }
            }
        }
    },
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
    //             } else if (rule.validator) {
    //                 if (isFunction(rule.validator)) {
    //                     rule.validator(rule.params, value).then(data => {
    //                         console.log('rule.validator(rule.params, value) 11111----- ')
    //                         // console.log(000000000000000)
    //                         console.log(data)
    //                         return data
    //                     })
    //                     console.log('rule.validator(rule.params, value) ----- ')
    //                     // console.log(000000000000000)
    //                     console.log(rule.validator(rule.params, value))
    //                 }
    //             } else {
    //                 console.log(11111111111111111111)
    //                 return {
    //                     valid: true,
    //                     msg: name + '必填了'
    //                 }
    //             }
    //         } else {
    //             console.log(2222222222222)
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

    /**
     * 唯一性验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：cfield(String)
     */
    checkValid: (params = {}, value, callback) => {
        // console.log(rule)
        let paramsfn = {
            field: params.field,
            value: value
        }
        console.log(paramsfn)
        // return new Promise (resolve => {
        //     axios.post(params.vm.$apiUrl(`${params.url}/check`), paramsfn)
        //         .then(data => {
        //             let result = {}
        //             if (data.res) {
        //                 result = {
        //                     valid: data.res,
        //                     msg: name + '可以使用'
        //                 }
        //             } else {
        //                 result = {
        //                     valid: data.res,
        //                     msg: name + (rule.message || '已存在')
        //                 }
        //             }
        //             resolve(result)
        //         })
        // })
    }
}
