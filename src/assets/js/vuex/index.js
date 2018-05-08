import Vuex from 'vuex'
import headerSetting from './headerSetting'
import basicIndex from './basicIndex'
export default new Vuex.Store({
    modules: {
        headerSetting,
        basicIndex
    }
})
