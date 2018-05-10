<template>
    <div class="basic">
    	<div class="basic_top" v-if="hasConditonSelect">
    		<flexbox>
                <flexbox-item :span="5">
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
        <div class="basic_list" v-if="hasList" ref="wrapper" :style="{height: height}">
            <!-- <load-more tip="正在加载" v-if="showLoading"></load-more> -->
            <!-- <loading :show="showLoading" text="加载中"></loading> -->
            <list 
                :data="list" 
                @onButtonClick="onButtonClick"
                @toDetail="toDetail" />
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
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel, Popup, Cell, LoadMore, Loading, ToastPlugin } from 'vux'
import PopupForm from '../input/popupForm.vue'
import { isFunction, serializeData } from 'UTILS/utils.js'
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
        list
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
        let he = window.screen.height - 140
        return {
            list: [],
            isShowPopup: false,
            formData: [],
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
            showPullDown: false,
            height: `${he}px`,
            showLoading: true,
            searchValue: '',
            flag: ''
        }
    },
    methods: {
        // 图片方式发生错误时触发
        onImgError (item, $event) {
            // console.log(item, $event)
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
            this.formData = this.model.formField()
            console.log('this.formData ---- ')
            console.log(this.formData)
        },
        // 关闭表单
        handleClose () {
            this.isShowPopup = false
        },
        // 获取数据
        getInfo (query = {page: 1, cstatus: 1}) {
            let model = this.$route.params.model
            let url
            url = model === 'myPotting' ? 'pot/self' : 'pot'
            index(this, url, query).then(res => {
                this.showLoading = false
                this.list.push(...res.data)
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
                        this.getInfo({page: this.list.current_page + 1, cstatus: 1})
                    }
                    this.scroll.finishPullUp()
                    this.scroll.refresh()
                })
                // 下拉加载
                this.scroll.on('pullingDown', () => {
                    this.showPullDown = true
                    setTimeout(() => {
                        this.list = []
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
            this.list = []
            this.getInfo({query_text: val})
        },
        // 右拉事件
        onButtonClick (val, id) {
            console.log(id)
            if (val === 'delete') {
                destroy(this, 'pot', id)
                    .then(res => {
                        this.$vux.toast.text('删除成功', 'middle')
                        this.getInfo()
                    })
            } else {
                this.flag = 'edit'
                this.isShowPopup = true
                this.formData = this.model.formField()
                edit(this, 'pot', id)
                    .then(res => {
                        console.log(res)
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
        },
        // 表单提交
        handleSubmit () {
            console.log(this.flag)
            let params = {
                ...serializeData(this.formData)
            }
            if (this.flag === 'add') {
                console.log(this.formData)
                store(this, 'pot', params)
                    .then(res => {
                        if (res) {
                            this.$vux.toast.text('新增成功')
                            this.handleClose()
                        }
                    })
            } else {
                console.log('编辑的')
                params._method = 'PUT'
                update(this, 'pot', this.formData['id'], params)
                    .then(res => {
                        if (res) {
                            this.$vux.toast.text('编辑成功')
                            this.handleClose()
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
        this.getInfo()
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    watch: {
        '$route': {
            handler: function (v) {
                // console.log(v)
                this.list = []
                this.getInfo()
            }
        }
    },
    created () {
    }
}
</script>

<style lang="sass">
.basic {
    .basic_top{
        padding: 5px;
        color: #727071;
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
