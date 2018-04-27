import userInfoDetail from '../../userInfo/Details/userInfoDetail.vue'
let details = {
    potting: {
        title: '盆栽详情',
    	// 介绍
    	// 是否有图片
    	hasIntroduceImg: true,
    	// 是否有介绍内容列表
    	hasIntroduce: true,
    	// 是否有记录列表
    	hasRecords: true,
    	// 介绍列表
    	introduceListField: [
	    	{
                label: '盆栽名称',
                field: 'name'
            },
            {
                label: '品种',
                field: 'variety'
            },
            {
                label: '生长习性',
                field: 'habit'
            },
            {
                label: '产地',
                field: 'origin'
            },
            {
                label: '用途',
                field: 'use_for'
            },
            {
                label: '外观',
                field: 'imgs'
            },
            {
                label: '负责人',
                field: 'main'
            },
            {
                label: '其他信息',
                field: 'info'
            },
            {
                label: '备注',
                field: 'memo'
            }
	    ],
	    // 记录列表
	    records: [
	    	{
	    		title: '节点记录',
	    		record: 'node'
	    	},
	    	{
	    		title: '浇水记录',
	    		record: 'watering'
	    	},
	    	{
	    		title: '施肥记录',
	    		record: 'fertilizer'
	    	},
	    	{
	    		title: '其他操作记录',
	    		record: 'order'
	    	},
	    	{
	    		title: '负责人',
	    		record: 'leader'
	    	},
	    	{
	    		title: '申请/邀请',
	    		record: 'invite'
	    	}
	    ]
    },
    myPotting: {
        title: '盆栽详情',
    	// 介绍
    	// 是否有图片
    	hasIntroduceImg: true,
    	// 是否有介绍内容列表
    	hasIntroduce: true,
    	// 是否有记录列表
    	hasRecords: true,
    	// 介绍列表
    	introduceListField: [
	    	{
                label: '盆栽名称',
                field: 'name'
            },
            {
                label: '品种',
                field: 'variety'
            },
            {
                label: '生长习性',
                field: 'habit'
            },
            {
                label: '产地',
                field: 'origin'
            },
            {
                label: '用途',
                field: 'use_for'
            },
            {
                label: '外观',
                field: 'imgs'
            },
            {
                label: '负责人',
                field: 'main'
            },
            {
                label: '其他信息',
                field: 'info'
            },
            {
                label: '备注',
                field: 'memo'
            }
	    ],
	    // 记录列表
	    records: [
	    	{
	    		title: '节点记录',
	    		record: 'node'
	    	},
	    	{
	    		title: '浇水记录',
	    		record: 'watering'
	    	},
	    	{
	    		title: '施肥记录',
	    		record: 'fertilizer'
	    	},
	    	{
	    		title: '其他操作记录',
	    		record: 'order'
	    	},
	    	{
	    		title: '负责人',
	    		record: 'leader'
	    	},
	    	{
	    		title: '申请/邀请',
	    		record: 'invite'
	    	}
	    ]
    },
    userInfo: {
        title: '个人信息',
        _hasCustomComponent: true,
        CustomComponent: userInfoDetail
    }
}
export default details