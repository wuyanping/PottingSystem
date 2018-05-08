<!-- 二级详情页 -->
<template>
	<div class="detailsDetails">
        <!-- 记录搜索 -->
		<div class="dd_top">
            <flexbox :gutter="0">
                <flexbox-item :span="3/12" class="txt-c">
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
            <panel :list="list" type="5" @on-click-item="handlePanelItem" @on-img-error="onImgError"></panel>
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
	</div>
</template>
<script>
import { XInput, Icon, Flexbox, FlexboxItem, DatetimePlugin, Panel, TransferDom, XHeader, Cell, Popup, Group, LoadMore, XSwitch, Loading } from 'vux'
import { isFunction } from 'UTILS/utils.js'
import { index } from 'UTILS/commonApi.js'
import BScroll from 'better-scroll'

Vue.use(DatetimePlugin)
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
        Loading
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
            defaultDate: dDate,
            searchDate: [null, null],
            list: [],
            listData: {},
            resData: [],
            isShowPopup: false,
            options: {
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
            showPullDown: false,
            showLoading: true
        }
    },
    methods: {
        showPlugin (index) {
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM-DD',
                value: this.defaultDate,
                onConfirm: (val) => {
                    this.$set(this.searchDate, index, val)
                    if (!this.searchDate.includes(null)) {
                        let select = {
                            date: this.searchDate
                        }
                        this.list = []
                        this.getMsg(select)
                    }
                }
            })
        },
        handlePanelItem (panelItem) {
            this.resData.forEach(v => {
                if (v.id === panelItem.id) {
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
        getMsg (query = {page: 1}) {
            let model = this.$route.params.record
            let id = this.$route.params.id
            index(this, `pot/${id}/${model}`, query)
                .then(res => {
                    this.showLoading = false
                    let listData = res.data
                    this.resData = listData
                    let title
                    switch (model) {
                    case 'node':
                        title = 'record'
                        break
                    case 'watering': case 'fertilizer': case 'order':
                        title = 'content'
                        break
                    }
                    listData.forEach(v => {
                        let obj = {
                            id: v.id,
                            title: v[title],
                            desc: v.date
                        }
                        if (v.imgs) {
                            Object.assign(obj, {
                                src: `/api${v.imgs}`,
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
                    console.log('pullingUp')
                    if (this.list.current_page < this.list.total_page) {
                        this.getMsg({page: this.list.current_page + 1})
                    }
                    this.scroll.finishPullUp()
                    this.scroll.refresh()
                })
                // 下拉加载
                this.scroll.on('pullingDown', () => {
                    console.log('pullingDown')
                    this.showPullDown = true
                    setTimeout(() => {
                        this.list = []
                        this.getMsg()
                        this.showPullDown = false
                    }, 1000)
                    this.scroll.finishPullDown()
                    this.scroll.refresh()
                })
            }
        }
    },
    mounted () {
        console.log(this.$route)
        this.getMsg()
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
