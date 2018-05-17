import { ajax } from './ajax'
import { apiUrl } from './utils'

// 通用Api接口
const commonApi = {
    /**
     * 获取数据
     * @param  {String}   router 当前路由名字
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    index (router, data, fn) {
        // ajax.call(this, 'get', apiUrl(router), data, fn)
        ajax.call(this, 'get', router, data, fn)
    },

    /**
     * 显示数据
     * @param  {object}   arg 当前路由名字以及id
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    show (arg, data, fn) {
        ajax.call(this, 'get', `${arg.router}/${arg.id}`, data, fn)
    },

    /**
     * 新增数据
     * @param  {String}   router 当前路由名字
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    store (router, data, fn) {
        ajax.call(this, 'post', router, data, fn)
    },

    /**
     * 获取编辑数据
     * @param  {object}   arg 当前路由名字以及id
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    edit (arg, data, fn) {
        ajax.call(this, 'get', `${arg.router}/${arg.id}/edit`, data, fn)
    },

    /**
     * 保存编辑数据
     * @param  {object}   arg 当前路由名字以及id
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    update (arg, data, fn) {
        ajax.call(this, 'put', `${arg.router}/${arg.id}`, data, fn)
    },

    /**
     * 删除数据
     * @param  {object}   arg 当前路由名字以及id
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    destroy (arg, data, fn) {
        ajax.call(this, 'delete', `${arg.router}/${arg.id}`, data, fn)
    },

    /**
     * 验证数据
     * @param  {String}   router 当前路由名字
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    check (router, data, fn) {
        ajax.call(this, 'post', `${router}/check`, data, fn)
    },

    /**
     * 批量删除
     * @param  {String}   router 当前路由名字
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    batchDelete (router, data, fn) {
        ajax.call(this, 'post', `${router}/batch-delete`, data, fn)
    },

    /**
     * 改变switch开关状态
     * @param  {object}   arg 当前路由名字以及id
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    status (arg, data, fn) {
        ajax.call(this, 'post', `${arg.router}/${arg.id}/review`, data, fn)
    }
}

// 对应通用接口的后续处理
module.exports = {
    commonApi,
    index (vm, path, params = {}) {
        return new Promise(resolve => {
            commonApi.index.call(vm, path, params, data => {
                resolve(data)
            })
        })
    },

    /**
     * 显示数据
     */
    show (vm, route, id) {
        let arg = {
            router: route,
            id: id
        }
        return new Promise(resolve => {
            commonApi.show.call(vm, arg, data => {
                resolve(data)
            })
        })
    },

    /**
     * 新增数据
     */
    store (vm, path, params) {
        return new Promise(resolve => {
            commonApi.store.call(vm, path, params, data => {
                resolve(data)
            })
        })
    },

    /**
     * 获取编辑数据
     */
    edit (vm, route, id) {
        let arg = {
            router: route,
            id: id
        }
        return new Promise(resolve => {
            commonApi.edit.call(vm, arg, data => {
                resolve(data)
            })
        })
    },

    /**
     * 保存编辑数据
     */
    update (vm, route, id, params) {
        let arg = {
            router: route,
            id: id
        }
        console.log('-------update ---- ')
        console.log(arg)
        console.log(params)
        return new Promise(resolve => {
            commonApi.update.call(vm, arg, params, data => {
                resolve(data)
            })
        })
    },

    /**
     * 删除数据
     * @param  {VueComponents}   vm       Vue组件
     * @param  {Object}          row      当前行对象
     */
    destroy (vm, route, id) {
        let arg = {
            router: route,
            id: id
        }
        return new Promise(resolve => {
            commonApi.destroy.call(vm, arg, data => {
                resolve(data)
            })
        })
    },

    /**
     * 验证数据
     * @param  {String}   router 当前路由名字
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     * routerObj必须使用path，否则次级的通用请求会报错
     */
    check (vm, path, params) {
        return new Promise(resolve => {
            commonApi.check.call(vm, path, params, data => {
                resolve(data)
            })
        })
    },

    /**
     * 批量删除
     */
    batchDestroy (vm, route, params) {
        return new Promise(resolve => {
            commonApi[`batchDelete`].call(vm, route, params, data => {
                resolve(data)
            })
        })
    },

    /**
     * 改变switch开关状态
     */
    status (vm, route, id, params) {
        let arg = {
            router: route,
            id: id
        }
        return new Promise(resolve => {
            commonApi[`status`].call(vm, arg, params, data => {
                resolve(data)
            })
        })
    }
}
