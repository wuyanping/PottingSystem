import * as global from './mutations_types'
import { ajax } from 'UTILS/ajax.js'

const state = {
    MONITOR_ALLADAPTER: []
}

const getters = {
}

const actions = {
    /**
     * [getStaticData 异步获取下拉框数据(数组类型)]
     * @Author              bwx
     * @DateTime 2017-08-17
     * @param    {[vuex]}        options.state  [vuex内部参数]
     * @param    {[vuex]}        options.commit [vuex内部参数]
     * @param    {[component]}   options.vm     [vue组件]
     * @param    {[String]}      options.arr    [要保持数据的数组名称]
     * @param    {[String]}      options.url    [ajax请求地址]
     * @param    {Object}        options.params [ajax请求所需参数，默认{}]
     * @return   {[Promise]}                    [返回一个promise函数]
     */
    getStaticData ({ state, commit }, { vm, arr, url, params = {} }) {
        return new Promise(resolve => {
            if (state[arr].length > 0) {
                resolve(state[arr])
            } else {
                ajax.call(vm, 'get', url, params, data => {
                    commit(arr, data)
                    resolve(data)
                })
            }
        })
    },

    /**
     * [getChildrenData 异步获取下拉框数据子级数据]
     * @Author              bwx
     * @DateTime 2017-08-17
     * @param    {[vuex]}         options.state  [vuex内部参数]
     * @param    {[vuex]}         options.commit [vuex内部参数]
     * @param    {[component]}    options.vm     [vue组件]
     * @param    {[String]}       options.arr    [要保持数据的数组名称]
     * @param    {[String]}       options.url    [ajax请求地址]
     * @param    {[Number]}       options.cval   [当前子级数据的id]
     * @param    {Object}         options.params [ajax请求所需参数，默认{}]
     * @return   {[Promise]}                     [返回一个promise函数]
     */
    getChildrenData ({ state, commit }, { vm, arr, url, cval, params = {} }) {
        return new Promise(resolve => {
            console.log('state[arr] --- ')
            console.log(state[arr])
            state[arr].data.forEach(v => {
                console.log(v.id === cval)
                if (v.id === cval) {
                    if (v['children']) {
                        resolve(v['children'])
                    } else {
                        ajax.call(vm, 'get', url, params, data => {
                            commit('GLOBAL_ADD_CHILDERN', {
                                data: data,
                                id: cval,
                                arr: arr
                            })
                            resolve(data)
                        })
                    }
                }
            })
        })
    },

    /**
     * [getStaticObjectData 异步获取下拉框数据(对象类型)]
     * @Author              bwx
     * @DateTime 2017-09-12
     * @param    {[vuex]}        options.state  [vuex内部参数]
     * @param    {[vuex]}        options.commit [vuex内部参数]
     * @param    {[component]}   options.vm     [vue组件]
     * @param    {[Object]}      options.obj    [要保持数据的对象名称]
     * @param    {[String]}      options.url    [ajax请求地址]
     * @param    {Object}        options.params [ajax请求所需参数，默认{}]
     * @return   {[Promise]}                    [返回一个promise函数]
     */
    getStaticObjectData ({ state, commit }, { vm, obj, url, params = {} }) {
        return new Promise(resolve => {
            if (Object.keys(state[obj]).length > 0) {
                resolve(state[obj])
            } else {
                ajax.call(vm, 'get', vm.$dataUrl(url), params, data => {
                    commit(obj, data)
                    resolve(data)
                })
            }
        })
    }
}

const mutations = {
    [global.MONITOR_ALLADAPTER] (state, data) {
        state.MONITOR_ALLADAPTER = data
    },

    [global.GLOBAL_ADD_CHILDERN] (state, { arr, data, id }) {
        state[arr].data.forEach(v => {
            if (v.id === id) {
                v['children'] = data
            }
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
