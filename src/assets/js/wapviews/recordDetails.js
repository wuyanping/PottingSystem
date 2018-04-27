import leader from './components/page/leader.vue'

function listItemClickFn (vm) {
    vm.isShowPopup = true
}

let model = {
    potting: {
        node: {
            commonTitle: '节点记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        water: {
            commonTitle: '浇水记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        fertilizer: {
            commonTitle: '施肥记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        order: {
            commonTitle: '其他操作记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        leader: {
            commonTitle: '负责人',
            _hasCustomComponent: true,
            CustomComponent: leader
        },
        invite: {
            commonTitle: '申请/邀请',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        }
    },
    myPotting: {
        node: {
            commonTitle: '节点记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        water: {
            commonTitle: '浇水记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        fertilizer: {
            commonTitle: '施肥记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        order: {
            commonTitle: '其他操作记录',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        },
        leader: {
            commonTitle: '负责人',
            _hasCustomComponent: true,
            CustomComponent: leader
        },
        invite: {
            commonTitle: '申请/邀请',
            // 是否显示搜索
            hasConditonSelect: true,
            // 是否列表
            hasList: true,
            listItemClickFn: listItemClickFn,
            // commonConditionComponents: [],
            // 列表列 必须需要这些字段
            commonListField: ['id', 'src', 'fallbackSrc', 'title', 'desc']
        }
    }
    // ,
    // userInfo: {
    // }
}
export default model
