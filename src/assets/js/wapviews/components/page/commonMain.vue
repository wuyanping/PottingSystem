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
                        <icon slot="right" type="search"></icon>
                    </x-input>
                </flexbox-item>
            </flexbox>
    	</div>

        <!-- 盆栽列表 -->
        <div class="basic_list" v-if="hasList" ref="wrapper" :style="{height: height}">
            <load-more tip="正在刷新" v-if="showPullDown"></load-more>
            <panel :list="list" type="5" @on-click-item="handlePanelItem" @on-img-error="onImgError"></panel>
            <loading :show="showLoading" text="加载中"></loading>
        </div>
         
        <!-- 新建弹框 -->
        <PopupForm 
            :formData="formData"
            :isShowPopup="isShowPopup"
            :isShowSibmitBtn="true"
            @closePopup="closePopup"
        ></PopupForm>
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel, Popup, Cell, LoadMore, Loading } from 'vux'
import PopupForm from '../input/popupForm.vue'
import { isFunction } from 'UTILS/utils.js'
import BScroll from 'better-scroll'
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
        Loading
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
            list: [
                // {
                //     id: 0,
                //     src: 'http://somedomain.somdomain/x.jpg',
                //     fallbackSrc: './static/image/company_default_logo.png',
                //     title: '标题一标题一标题一标题一标题一标题一标题一',
                //     desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                // }
            ],
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
            searchValue: ''
        }
    },
    methods: {
        // 图片方式发生错误时触发
        onImgError (item, $event) {
            console.log(item, $event)
        },
        // 点击盆栽列，跳到盆栽详情页
        handlePanelItem (panelItem) {
            if (isFunction(this.model.listItemClickFn)) {
                this.model.listItemClickFn(this, panelItem)
            }
        },
        // 新增表单
        newForm () {
            this.isShowPopup = true
            this.formData = this.model.formField()
            console.log(this.formData)
        },
        // 关闭表单
        handleClose () {
            this.isShowPopup = false
        },
        changeIsShowFinish () {},
        // 提交表单
        sibmitForm () {

        },
        closePopup () {
            this.isShowPopup = false
        },
        getListMsg (page = 1) {
            axios.get(`/api/pot?page=${page}`).then(res => {
                this.showLoading = false
                let potData = res.data.data
                potData.forEach(v => {
                    let obj = {
                        id: v.id,
                        title: v.name,
                        desc: v.use_for,
                        src: `/api/${v.imgs}`,
                        fallbackSrc: './static/image/company_default_logo.png'
                    }
                    this.list.push(obj)
                })
                this.list.current_page = res.data.current_page
                this.list.total_page = Math.ceil(res.data.total / res.data.per_page)
            })
        },
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
                        this.getListMsg(this.list.current_page + 1)
                    }
                    this.scroll.finishPullUp()
                    this.scroll.refresh()
                })
                // 下拉加载
                this.scroll.on('pullingDown', () => {
                    this.showPullDown = true
                    setTimeout(() => {
                        this.list = []
                        this.getListMsg()
                        this.showPullDown = false
                    }, 1000)
                    this.scroll.finishPullDown()
                    this.scroll.refresh()
                })
            }
        }
    },
    mounted () {
        this.getListMsg()
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    created () {
        this.$nextTick(() => {
            this._initScroll()
        })
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
