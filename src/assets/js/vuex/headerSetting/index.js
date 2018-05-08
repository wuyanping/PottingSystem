import * as func from '../function.js'
// 手机端header
const state = {
    headerSetting: func.headerSettingLocal.get() || {showBack: false, backText: '', title: ''},
    record: func.modelLocal.get() || {record: 'index.js'},
    siderBar: func.siderBarLocal.get() || {siderBar: true}
}
// getters
const getters = {
    headerSetting: (state) => {
        return state.headerSetting
    },

    getRecord (state) {
        console.log('state ---- ')
        console.log(state)
        return state.record.record
    },

    getSiderBar (state) {
        return state.siderBar.siderBar
    }
}

// actions
const actions = {
    changeHeaderSetting ({ commit }, obj) {
        commit('changeHeaderSetting', obj)
    },

    switch_record: ({commit}, param) => {
        commit('SWITCHRECORD', {record: param})
    },

    change_siderBar: ({commit}, param) => {
        commit('CHANGESIDERBAR', {siderBar: param})
    }
}

// mutations
const mutations = {
    changeHeaderSetting (state, obj) {
        state.headerSetting = obj
    },
    SWITCHRECORD (state, obj) {
        state.record.record = obj.record
        func.modelLocal.set(state.record)
    },

    CHANGESIDERBAR (state, obj) {
        state.siderBar.siderBar = obj.siderBar
        func.siderBarLocal.set(state.siderBar)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
