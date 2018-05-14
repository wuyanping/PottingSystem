<!-- 二级详情页 -->
<template>
	<div class="detailsDetails">
        <!-- 记录搜索 -->
		<div class="dd_top">

            <flexbox :gutter="0">
                <flexbox-item :span="1/12" class="txt-c">
                    <div @click="handleAdd" v-if="msgUser">新增</div>
                </flexbox-item>
                <flexbox-item :span="2/12" class="txt-c">
                    时间搜索
                </flexbox-item>
                <flexbox-item :span="4/12">
                    <x-input class="dd_inputDate" @click.native="showPlugin(0)" disabled :value="searchDate[0]" placeholder="开始时间">
                        <i slot="right" class="icon iconfont icon-date dd_inputIcon" ></i>
                    </x-input>
                </flexbox-item>
                <flexbox-item :span="1/12" class="txt-c">
                    至
                </flexbox-item>
                <flexbox-item :span="4/12">
                    <x-input class="dd_inputDate" @click.native="showPlugin(1)" disabled :value="searchDate[1]" placeholder="结束时间">
                        <i slot="right" class="icon iconfont icon-date dd_inputIcon" ></i>
                    </x-input>
                </flexbox-item>
            </flexbox>
        </div>
        
        <!-- 节点列表 -->
        <div class="dd_main" ref="wrapper" :style="{height: height}">
            <load-more tip="正在刷新" v-if="showPullDown" />
            <list 
                :data="list" 
                :isNoMsg="isNoMsg"
                @onButtonClick="onButtonClick"
                @toDetail="handlePanelItem" />
            <loading :show="showLoading" text="加载中" />
        </div>
        
        <!-- 盆栽节点详情弹框 -->
        <div v-transfer-dom>
            <popup v-model="isShowPopup" height="100%" width='100%' position="right">
                <div class="popup1">
                    <x-header :left-options="{showBack: false}">
                        <a slot="left" @click="handleClose">关闭</a>
                    </x-header>
                    <group>
                        <cell
                            v-for="(item,i) in introduceListField"
                            :key="i"
                            :title="`${item.label}：`"
                            :value="listData[item.field]">
                            <img v-if="item.label === '外观' && listData[item.field]!==null" :src="`/api/${listData[item.field]}`" style="width: 50px;height:50px;">
                        </cell>
                    </group>
                </div>
            </popup>
        </div>

        <!-- 新建弹框 -->
        <PopupForm 
            :formData="formData"
            :isShowPopup="isShowAdd"
            :isShowSibmitBtn="true"
            @closePopup="closePopup"
            @handleSubmit="handleSubmit"
        ></PopupForm>
	</div>
</template>
<script>
import { XInput, Icon, Flexbox, FlexboxItem, DatetimePlugin, Panel, TransferDom, XHeader, Cell, Popup, Group, LoadMore, XSwitch, Loading, ToastPlugin } from 'vux'
import { isFunction, serializeData } from 'UTILS/utils.js'
import { index, store, destroy, edit, update } from 'UTILS/commonApi.js'
import BScroll from 'better-scroll'
import PopupForm from '../input/popupForm.vue'
import list from '../list.vue'

Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)

export default {
    directives: {
        TransferDom
    },
    props: {
        recordDetails: Object,
        route: ''
    },
    components: {
        XHeader,
        // List,
        XInput,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel,
        Cell,
        Popup,
        Group,
        LoadMore,
        XSwitch,
        Loading,
        list,
        PopupForm
    },
    computed: {
        title () {
            if (this.recordDetails.title) {
                return this.recordDetails.title
            } else {
                return ''
            }
        },
        hasConditonSelect () {
            if (this.recordDetails.hasConditonSelect) {
                return this.recordDetails.hasConditonSelect
            } else {
                return ''
            }
        },
        hasList () {
            if (this.recordDetails.hasList) {
                return this.recordDetails.hasList
            } else {
                return ''
            }
        },
        commonListField () {
            if (this.recordDetails.commonListField) {
                return this.recordDetails.commonListField
            } else {
                return ''
            }
        },
        introduceListField () {
            if (this.recordDetails.introduceListField) {
                return this.recordDetails.introduceListField
            } else {
                return ''
            }
        }
    },
    data () {
        let he = window.screen.height - 140
        let date = new Date()
        let dDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return {
            formData: [],
            defaultDate: dDate,
            searchDate: [null, null],
            list: [],
            listData: {},
            resData: [],
            isShowPopup: false, // 详情弹框
            options: { // 上下拉参数
                pullDownRefresh: {
                    threshold: 50,
                    stop: 20
                },
                pullUpLoad: {
                    threshold: -20
                },
                click: true,
                probeType: 3,
                startY: 0,
                scrollbar: false
            },
            height: `${he}px`,
            showPullDown: false, // 下拉刷新
            showLoading: false, // 全局加载中
            isShowAdd: false, // 新建弹框
            flag: '',
            isNoMsg: false, // 暂无数据,
            msgUser: ''
        }
    },
    methods: {
        // 时间搜索
        showPlugin (index) {
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM-DD',
                value: this.defaultDate,
                clearText: 'clear',
                onHide: () => {
                    console.log(this.searchDate)
                    if (this.searchDate[0] === null && this.searchDate[1] === null) {
                        this.list = []
                        this.getMsg()
                    } else if (this.searchDate[0] !== null && this.searchDate[1] !== null) {
                        let select = {
                            date: this.searchDate
                        }
                        this.list = []
                        this.getMsg(select)
                    }
                },
                onClear: () => {
                    this.$set(this.searchDate, index, null)
                },
                onConfirm: (val) => {
                    this.$set(this.searchDate, index, val)
                }
            })
        },
        // 详情页
        handlePanelItem (id) {
            this.resData.forEach(v => {
                if (v.id === id) {
                    this.listData = v
                }
            })
            if (isFunction(this.recordDetails.listItemClickFn)) {
                this.recordDetails.listItemClickFn(this)
            }
        },
        onImgError () {
        },
        handleClose () {
            this.isShowPopup = false
        },
        closePopup () {
            this.isShowAdd = false
        },
        getMsgUser () {
            let potId = this.$route.params.id
            index(this, `pot/${potId}`)
                .then(res => {
                    this.msgUser = res['main'].join().includes(window.bdUser['name'])
                    console.log(res)
                })
        },
        // 获取数据
        getMsg (query = {page: 1}) {
            this.showLoading = true
            let model = this.$route.params.record
            let potId = this.$route.params.id
            index(this, `pot/${potId}/${model}`, query)
                .then(res => {
                    console.log(res)
                    this.showLoading = false
                    this.resData = res.data
                    let title
                    switch (model) {
                    case 'node':
                        title = 'record'
                        break
                    case 'watering': case 'fertilizer': case 'order':
                        title = 'content'
                        break
                    }
                    res.data.forEach(v => {
                        let obj = {
                            id: v.id,
                            name: v[title],
                            use_for: v.date,
                            main: [v.user_id]
                        }
                        if (v.imgs) {
                            Object.assign(obj, {
                                imgs: v.imgs,
                                fallbackSrc: './static/image/company_default_logo.png'
                            })
                        }
                        switch (v.status) {
                        case 0:
                            v.status = '良好'
                            break
                        case 1:
                            v.status = '一般'
                            break
                        case 2:
                            v.status = '较差'
                            break
                        case 3:
                            v.status = '非常差'
                            break
                        }
                        this.list.push(obj)
                    })
                    this.list.current_page = res.current_page
                    this.list.total_page = Math.ceil(res.total / res.per_page)
                })
        },
        // 初始下拉上拉
        _initScroll () {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, this.options)
            if (this.options.pullUpLoad) {
                let vm = this
                // 上拉刷新
                this.scroll.on('pullingUp', () => {
                    if (this.list.current_page < this.list.total_page) {
                        this.getMsg({page: this.list.current_page + 1})
                    } else if (this.list.current_page === this.list.total_page) {
                        this.isNoMsg = true
                    }
                    this.scroll.finishPullUp()
                    this.scroll.refresh()
                })
                // 下拉加载
                this.scroll.on('pullingDown', () => {
                    this.showPullDown = true
                    setTimeout(() => {
                        this.list = []
                        this.isNoMsg = false
                        this.getMsg()
                        this.showPullDown = false
                    }, 1000)
                    this.scroll.finishPullDown()
                    this.scroll.refresh()
                })
            }
        },
        // 新增按钮
        handleAdd () {
            this.flag = 'add'
            this.isShowAdd = true
            this.formData = this.recordDetails.formField()
        },
        // 新增提交
        handleSubmit () {
            let model = this.$route.params.record
            let potId = this.$route.params.id
            let params = {
                ...serializeData(this.formData)
            }
            if (this.flag === 'add') {
                store(this, `pot/${potId}/${model}`, params)
                    .then(res => {
                        this.$vux.toast.text('新增成功')
                        this.closePopup()
                        this.list = []
                        this.getMsg()
                    })
            } else {
                params._method = 'PUT'
                update(this, `pot/${potId}/${model}`, this.formData['id'], params)
                    .then(res => {
                        if (res) {
                            this.$vux.toast.text('编辑成功')
                            this.closePopup()
                            this.list = []
                            this.getMsg()
                        }
                    })
            }
        },
        // 编辑删除
        onButtonClick (val, id) {
            let model = this.$route.params.record
            let potId = this.$route.params.id
            if (val === 'delete') {
                console.log(val)
                destroy(this, `pot/${potId}/${model}`, id)
                    .then(res => {
                        if (res === 1) {
                            this.$vux.toast.text('删除成功')
                            this.list = []
                            this.getMsg()
                        }
                    })
            } else {
                this.flag = 'edit'
                this.isShowAdd = true
                console.log(model)
                console.log(id)
                this.formData = this.recordDetails.formField()
                edit(this, `pot/${potId}/${model}`, id)
                    .then(res => {
                        switch (res.status) {
                        case 0:
                            res.status = ['良好']
                            break
                        case 1:
                            res.status = ['一般']
                            break
                        case 2:
                            res.status = ['较差']
                            break
                        case 3:
                            res.status = ['非常差']
                            break
                        }
                        this.formData.forEach(v => {
                            Object.keys(res).forEach(i => {
                                if (v.name === i) {
                                    v.value = res[i]
                                }
                            })
                        })
                        this.formData['id'] = id
                    })
            }
        }
    },
    mounted () {
        this.getMsg()
        this.getMsgUser()
        setTimeout(() => {
            this._initScroll()
        }, 20)
    }
}
</script>
<style lang="sass">
$theme-color: #1eac94;
.detailsDetails{
    .dd_top{
        width: 98%;
        padding: 10px 0px;
        .dd_inputDate{
            border: 1px solid $theme-color;
            .dd_inputIcon{
                color: $theme-color;
                font-size: 20px;
            }
        }
        .weui-cell{
            padding: 0px 13px;
        }
    }
    .dd_main{

    }
}
</style>
