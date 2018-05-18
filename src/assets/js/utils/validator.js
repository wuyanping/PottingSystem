import { check } from './commonApi.js'
const validtor = {
    /**
     * 唯一性验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：cfield(String)
     */
    checkValid: (rule, value, callback) => {
        let params = {
            id: rule['id'],
            field: rule['cfield'],
            value: value
        }
        check(rule['vm'], rule['route'], params)
            .then(data => {
                if (data.res === true) {
                    callback()
                } else {
                    callback(new Error(rule['label'] + '已存在'))
                }
            })
    },
    /**
     * 长度验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：lng(Number)
     */
    lngValid: (rule, value, callback) => {
        if (value && value.trim().length > rule['lng']) {
            callback(new Error(rule['label'] + `最多有${rule['lng']}字`))
        } else {
            callback()
        }
    },
    /**
     * 固定长度验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：lng(Number)
     */
    fixedLngValid: (rule, value, callback) => {
        if (value && value.trim().length !== rule['lng']) {
            callback(new Error(rule['label'] + `必须为${rule['lng']}字`))
        } else {
            callback()
        }
    },
    /**
     * 数字验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：无
     */
    numberValid: (rule, value, callback) => {
        if (value && isNaN(value.trim())) {
            callback(new Error(rule['label'] + '只能填入数字'))
        } else {
            callback()
        }
    },
    /**
     * 正数验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：无
     */
    plusNumValid: (rule, value, callback) => {
        if (value && value <= 0) {
            callback(new Error(rule['label'] + '只能填入正整数'))
        } else {
            callback()
        }
    },
    /**
     * 邮箱验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：无
     */
    emailValid: (rule, value, callback) => {
        if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/.test(value))) {
            callback(new Error(rule['label'] + `格式错误`))
        } else {
            callback()
        }
    },
    /**
     * 密码验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：无
     */
    passwordValid: (rule, value, callback) => {
        if (value && (value.trim().length < 12 || String.trim(value).length > 30)) {
            callback(new Error(rule['label'] + '的长度为12至30个字符'))
        } else {
            callback()
        }
    },
    /**
     * 密码对比
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：无
     */
    comparePasswordValid: (rule, value, callback) => {
        let pwd = rule['vm']['commonFormData']['formField'].find(item => item.field === 'password').value
        if (pwd !== value) {
            callback(new Error('密码不一致'))
        } else {
            callback()
        }
    },

    /**
     * 手机和固话验证
     * @Author   wuyanping
     * @DateTime 2018-04-18
     * 参数：无
     */
    phoneValid: (rule, value, callback) => {
        if (value !== '' && value !== null) {
            let bol = (value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) || (value.length === 12 && /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value))
            if (!bol) {
                callback(new Error('请输入正确的联系方式'))
            } else {
                callback()
            }
        } else {
            callback()
        }
    }
}

module.exports = validtor
