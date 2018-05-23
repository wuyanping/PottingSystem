<template>
    <div class="basic h100" ref="basic">
    	<div class="basic_top" >
    		<flexbox>
                <flexbox-item :span="5" v-if="hasConditonSelect">
                    <div class="basic_top_l">
                        <span class="active">全部盆栽</span>
                        <span @click="newForm">新增盆栽</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <x-input class="weui-vcode basic_top_r"
                        v-model="searchValue"
                        placeholder="搜索">
                        <icon slot="right" 
                            type="search" 
                            @click.native="handleSearch(searchValue)" />
                    </x-input>
                </flexbox-item>
            </flexbox>
    	</div>

        <!-- 盆栽列表 -->
        <!-- <div class="basic_list" v-if="hasList"  :style="{height: height}"> -->
        <div class="basic_list" v-if="hasList">
            <div class="basic_list_centent" ref="wrapper">
                <load-more tip="正在刷新" v-if="showPullDown"></load-more>
                <list 
                    :data="list" 
                    :isNoMsg="isNoMsg"
                    @onButtonClick="onButtonClick"
                    @toDetail="toDetail" />
                <loading :show="showLoading" text="加载中" />
            </div>
        </div>
         
        <!-- 新建弹框 -->
        <PopupForm 
            :formData="formData"
            :isShowPopup="isShowPopup"
            :isShowSibmitBtn="true"
            @closePopup="handleClose"
            @handleSubmit="handleSubmit"
        ></PopupForm>
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel, Popup, Cell, LoadMore, Loading, ToastPlugin, Search } from 'vux'
import PopupForm from '../input/popupForm.vue'
import { isFunction, serializeData, getStyle } from 'UTILS/utils.js'
import BScroll from 'better-scroll'
import { index, destroy, store, update, edit } from 'UTILS/commonApi.js'
import list from '../list.vue'

Vue.use(ToastPlugin)

export default {
    components: {
        // List,
        XInput,
        Group,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel,
        Cell,
        PopupForm,
        LoadMore,
        Loading,
        list,
        Search
    },
    props: {
        model: {
            type: Object,
            default () {
                return {}
            }
        },
        route: {
            type: String,
            default: ''
        }
    },
    computed: {
        hasConditonSelect () {
            if (this.model.hasConditonSelect) {
                return this.model.hasConditonSelect
            } else {
                return false
            }
        },
        hasList () {
            if (this.model.hasList) {
                return this.model.hasList
            } else {
                return false
            }
        },
        commonListField () {
            if (this.model.commonListField) {
                return this.model.commonListField
            } else {
                return []
            }
        }
    },
    data () {
        let he = window.screen.height
        return {
            list: [],
            isShowPopup: false, // 新建弹框
            formData: [],
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
                scrollbar: false,
                /**
                   * 是否派发滚动到底部的事件，用于上拉加载
                   */
                pullup: false
            },
            showPullDown: false, // 下拉刷新
            height: `${he}px`,
            showLoading: false, // 全局加载中
            searchValue: '',
            isNoMsg: false, // 暂无数据
            flag: ''
        }
    },
    methods: {
        // 图片方式发生错误时触发
        onImgError (item, $event) {
        },
        // 点击盆栽列，跳到盆栽详情页
        handlePanelItem (panelItem) {
            if (isFunction(this.model.listItemClickFn)) {
                this.model.listItemClickFn(this, panelItem)
            }
        },
        // 新增表单
        newForm () {
            this.flag = 'add'
            this.isShowPopup = true
            this.formData = this.setFormData(this.flag)
        },
        // 设置表单对话框数据
        setFormData (type, row = {}) {
            let data = this.model.formField(type)
            data.forEach(item => {
                // 在打开对话框同时赋值
                if (Object.keys(row).includes(item['name'])) {
                    if (item.customEditFn) {
                        item['value'] = item.customEditFn(row[item['name']])
                    } else {
                        item['value'] = row[item['name']]
                    }
                }
            })
            return data
        },
        // 关闭表单
        handleClose () {
            this.isShowPopup = false
        },
        // 获取数据
        getInfo (query = {page: 1, cstatus: 1}, fn) {
            this.showLoading = true
            let model = this.$route.params.model
            let url
            url = model === 'myPotting' ? 'pot/self' : 'pot'
            index(this, url, query).then(res => {
                this.showLoading = false
                this.list.push(...res.data)
                this.list.current_page = res.current_page
                this.list.total_page = Math.ceil(res.total / res.per_page)
                if (fn) {
                    fn()
                }
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
                        this.getInfo({page: this.list.current_page + 1, cstatus: 1})
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
                        this.getInfo()
                        this.showPullDown = false
                    }, 1000)
                    this.scroll.finishPullDown()
                    this.scroll.refresh()
                })
            }
        },
        // 搜索
        handleSearch (val) {
            console.log(val)
            if (val === '') {
                this.$vux.toast.text('请输入搜索内容')
                return
            }
            this.list = []
            this.getInfo({query_text: val})
        },
        // 右拉事件
        onButtonClick (val, id) {
            if (val === 'delete') {
                destroy(this, 'pot', id)
                    .then(res => {
                        this.$vux.toast.text('删除成功', 'middle')
                        this.list = []
                        this.getInfo()
                    })
            } else {
                this.flag = 'edit'
                this.isShowPopup = true
                this.formData = this.model.formField()
                edit(this, 'pot', id)
                    .then(res => {
                        this.formData = this.setFormData(this.flag, res)
                        // this.formData.forEach(v => {
                        //     Object.keys(res).forEach(i => {
                        //         if (v.name === i) {
                        //             v.value = res[i]
                        //         }
                        //     })
                        // })
                        this.formData['id'] = id
                    })
            }
        },
        // 表单提交
        handleSubmit () {
            let params = {
                _type: this.flag,
                ...serializeData(this.formData)
            }
            if (this.flag === 'add') {
                store(this, 'pot', params)
                    .then(res => {
                        if (res) {
                            this.$vux.toast.text('新增成功')
                            this.$vux.toast.show('新增成功，等待管理员审核通过！')
                            this.handleClose()
                        }
                    })
            } else {
                params._method = 'PUT'
                update(this, 'pot', this.formData['id'], params)
                    .then(res => {
                        if (res) {
                            this.$vux.toast.show('编辑成功')
                            this.handleClose()
                            this.list = []
                            this.getInfo()
                        }
                    })
            }
        },
        toDetail (id) {
            this.$router.push(`${this.$route.params.model}/${id}`)
        }
    },
    mounted () {
        // this.getInfo()
        // this.height = getStyle(this.$refs.basic, 'height')
        // setTimeout(() => {
        //     this._initScroll()
        // }, 20)
    },
    watch: {
        '$route': {
            handler: function (v) {
                this.list = []
                this.getInfo()
            }
        }
    },
    created () {
        this.getInfo(undefined, () => {
            this._initScroll()
        })
    }
}
</script>

<style lang="sass">
.basic {
    position: relative;
    .basic_top{
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        color: #727071;
        position: absolute;
        left: 0;
        top: 0;
        background-color: white;
        z-index: 5;
        box-shadow: 0px -1px 5px 1px #999999;
        .basic_top_l {
            >span{
                display:inline-block;
                padding: 5px;
            }
            >span:first-child{
                border-right: 1px solid #c6c5ca;
            }
            >span.active{
                color: #1eac94;
            }
        }
        .basic_top_r{
            border: 1px solid #78c1ae;
        }
        .weui-cell{
            padding: 5px 13px;
        }
    }
    .basic_list{
        height: 100%;
        padding-top: 40px;
        box-sizing: border-box;
        .basic_list_centent{
            height: 100%;
            overflow: auto;
        }
        .weui-cells{
            margin-top:5px;
        }
    }
    .popup1 {
        width:100%;
        height:100%;
    }
}
</style>
