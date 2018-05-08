import * as func from '../function.js'
// 手机端header
const state = {
    headerSetting: func.headerSettingLocal.get() || {showBack: false, backText: '', title: ''}
}
// getters
const getters = {
    headerSetting: (state) => {
        return state.headerSetting
    }
}

// actions
const actions = {
    changeHeaderSetting ({ commit }, obj) {
        commit('changeHeaderSetting', obj)
    }
}

// mutations
const mutations = {
    changeHeaderSetting (state, obj) {
        state.headerSetting = obj
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
