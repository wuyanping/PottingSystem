// 由于webpage配置了axios为全局变量无需引入
// import axios from 'axios'

import { isFunction } from './utils.js'

const message = function (vm, msg) {
    vm.$message({
        showClose: false,
        message: msg,
        type: 'error',
        duration: 2000,
        customClass: 'message error',
        iconClass: 'messageicon'
    })
}

// 全局错误配置
const errCB = {
    statusError (err) {
        console.dir(err)
        if (err.response.status === 401) {
            message(this, '未通过授权')
        } else if (err.response.status === 422) {
            let msg = ''
            for (let i in err.response.data) {
                if (err.response.data[i] instanceof Array) {
                    msg = err.response.data[i][0]
                } else {
                    msg = err.response.data[i]
                }
            }
            message(this, msg)
        } else if (err.response.status === 500) {
            if (err.response.data.message) {
                message(this, err.response.data.message)
            } else {
                message(this, '服务器错误')
            }
        } else if (err.response.status === 403) {
            message(this, '权限不足')
        } else if (err.response.status === 404) {
            message(this, '请求地址不存在')
        } else {
            message(this, '未知错误')
        }
    },
    requestError (err) {
        this.$message({
            showClose: false,
            message: '请求错误：' + err.response.status + ',' + err.response.statusText,
            type: 'error',
            customClass: 'message error',
            iconClass: 'messageicon'
        })
    }
}

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 */
const ajax = function (type, url, data, fn) {
    let flag = false, config = {}, datas
    if (fn == true) {
        // 用于控制是否显示读取过程
        flag = fn
    }
    if (data instanceof Function) {
        fn = data
        data = {}
    }
    if (type === 'get') {
        datas = {
            params: data
        }
    } else {
        console.log('ajax data ------- ')
        console.log(data)
        if (data['_hasfile']) { // 当有文件的情况
            // 当前提交是update时，后台方法为put 但是put方法是不能获取到formdata的数据
            // add by suzhihao (2017.8.31)
            type = 'post'
            if (data['_type'] === 'edit') {
                Object.assign(data, { _method: 'PUT' })
            }
            config = {
                headers: {
                    'Content-Type': 'multiple/form-data'
                }
            }
            let fd = new FormData()
            for (let i in data) {
                if (data[i] === null) continue
                fd.append(i, data[i])
            }
            datas = fd
        } else {
            datas = data
            console.log(111)
        }
        console.log(datas)
    }
    return new Promise((resolve, reject) => {
        axios[type](url, datas, config)
            .then(res => {
                isFunction(fn) && fn(res.data)
                resolve(res)
            })
            .catch(err => {
                errCB.statusError.call(this, err)
                reject(err)
            })
    })
}

module.exports = {
    ajax: ajax,
    errCB: errCB
}
