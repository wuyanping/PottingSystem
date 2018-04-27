import userInfo from '../../userInfo/userInfo.vue'

function listItemClickFn (vm, panelItem) {
    vm.$router.push(`${vm.$route.path}/${panelItem.id}`)
}

let model = {
    potting: {
        title: '盆栽列表',
        // 是否显示搜索
        hasConditonSelect: false,
        // 是否列表
        hasList: true,
        // 别表点击的之后执行的方法
        listItemClickFn: listItemClickFn,
        // commonConditionComponents: [],
        // 列表列 必须需要这些字段
        commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
    },
    myPotting: {
        title: '我的盆栽',
        hasConditonSelect: true,
        hasList: true,
        listItemClickFn: listItemClickFn,
        // commonConditionComponents: []，
        commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
    },
    userInfo: {
        _hasCustomComponent: true,
        CustomComponent: userInfo,
        title: '个人信息'
    }
}
export default model
