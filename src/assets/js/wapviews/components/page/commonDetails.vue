<!-- 一级详情页 -->
<template>
	<div class="commonDetails h100">

		<!-- 盆栽介绍 -->
		<div class="cd_top">
			<img v-if="hasIntroduceImg" :src="listData.imgs ? listData.imgs : url" />
			<div v-if="hasIntroduce" class="cd_t_conent">
                <loading :show="showLoading" text="加载中"></loading>
				<panel :list="introduce" type="2"></panel>
  				<group>
                    <div 
                        v-for="(item,i) in introduceListField"
                        :key="i">
                        <div v-if="item.params">
                            <cell
                                :title="`${item.label}：`"
                                is-link
                                :border-intent="false"
                                :arrow-direction="item.params.showContent ? 'up' : 'down'"
                                @click.native="item.params.showContent = !item.params.showContent">
                            </cell>

                            <template v-if="item.params.showContent">
                                <cell-form-preview :border-intent="false" :list="listData[item.field]"></cell-form-preview>
                            </template>
                        </div>

                        <div v-else>
                            <cell
                                :title="`${item.label}：`"
                                :value="listData[item.field]">
                            </cell>
                        </div>
                    </div>
			    </group>
			    <!-- <div class="cd_t_more">更多信息 ></div> -->
			</div>
			
		</div>

		<div class="grey_line"></div>
		
		<!-- 记录列表 -->
		<div class="cd_bottom" v-if='hasRecords'>
			<flexbox :gutter="0" wrap="wrap" justify="space-between">
		      	<flexbox-item
		      		:span="2/7"
		      		v-for='(rItem,i) in records'
		      		:key="i"
		      		@click.native="go(rItem.title, rItem.record, i)">
		      		<div class="flex-demo" >
		      			<i :class="`icon iconfont icon-${rItem.record}`"></i>
		      			<p>{{rItem.title}}</p>
		      		</div>
		      	</flexbox-item>
		    </flexbox>
		</div>

        <!-- 邀请弹框 -->
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
import { Flexbox, FlexboxItem, Blur, Panel, Group, Cell, CellFormPreview, Loading, Toast, ToastPlugin } from 'vux'
import PopupForm from '../input/popupForm.vue'
import { isArray, isObject, isString, serializeData } from 'UTILS/utils.js'
import { index, store } from 'UTILS/commonApi.js'
Vue.use(ToastPlugin)

export default {
    components: {
        PopupForm,
        Blur,
        Flexbox,
        FlexboxItem,
        Panel,
        Group,
        Cell,
        Loading,
        CellFormPreview,
        Toast
    },
    props: {
    	details: Object
    },
    data () {
        return {
            url: './static/image/company_default_logo.png',
            // 介绍
            introduce: [],
		    // 介绍列表
		    listData: {},
            // 加载
            showLoading: true,
            // 发出邀请的数据(盆栽列表部分的)
            show3: false,
            menus3: {
                title: '确定发送申请?',
                confirm: '<span style="color:red">确定</span>'
            },
            // （我的盆栽部分）
            formData: [],
            isShowPopup: false // 邀请弹框
        }
    },
    computed: {
 		hasIntroduceImg () {
            if (this.details.hasIntroduceImg) {
                return this.details.hasIntroduceImg
            } else {
                return false
            }
        },
        hasIntroduce () {
        	if (this.details.hasIntroduce) {
                return this.details.hasIntroduce
            } else {
                return false
            }
        },
        hasRecords () {
        	if (this.details.hasRecords) {
                return this.details.hasRecords
            } else {
                return false
            }
        },
        introduceListField () {
        	if (this.details.introduceListField) {
                return this.details.introduceListField
            } else {
                return []
            }
        },
        records () {
        	if (this.details.records) {
                return this.details.records
            } else {
                return []
            }
        }
    },
    methods: {
        // 记录跳转
    	go (title, record, i) {
            // invite不跳转
            if (record === 'invite') {
                this.isShowPopup = true
                this.formData = this.setFormData('add', i)
            } else {
                this.$emit('setHeader', {key: 'title', value: title})
                this.$router.push(`${this.$route.path}/${record}`)
            }
    	},
        // 关闭弹窗
        handleClose () {
            this.isShowPopup = false
        },
        // 表单提交
        handleSubmit () {
            let id = this.$route.params.id
            let type = 0
            let url = 'apply'
            if (this.$route.params.model === 'myPotting') {
                type = 1
                url = 'apply/apply'
            }
            let params = {
                type: type,
                id: id,
                ...serializeData(this.formData)
            }
            if (!params.name.length) {
                this.$vux.toast.text('请选择用户')
                return
            }
            store(this, url, params)
                .then(res => {
                    if (res) {
                        let tip = '发送成功，等待盆栽管理员审核通过！'
                        if (this.$route.params.model === 'myPotting') {
                            tip = '发送成功，等待邀请人通过！'
                        }
                        this.$vux.toast.show(tip)
                        this.handleClose()
                    }
                })
        },
    	getDetailMsg () {
    		let id = this.$route.params.id
    		index(this, `pot/${id}`)
    			.then(res => {
                    this.showLoading = false
                    this.listData = this.tableFieldFn(res)
	                let obj = {
                        title: res.name
                    }
    				this.introduce.push(obj)
    		    })
    	},
    	// 列表特殊值处理
        tableFieldFn: function (data) {
            // 处理数组变成字符串
            const arrStr = function (arr) {
                let arrString = ''
                if (isArray(arr)) {
                    arrString = arr.join()
                }
                return arrString
            }

            // 处理json字符串变成字符串
            const strObj = function (str) {
                let arrString = ''
                let arr = []
                if (str && isString(str)) {
                    let json = JSON.parse(str)
                    if (isObject(json)) {
                        for (let key in json) {
                            arr.push({
                                label: key,
                                value: json[key]
                            })
                        }
                    }
                } else {
                    arr.push({
                        label: '',
                        value: '无'
                    })
                }
                return arr
            }

            if (isObject(data)) {
                data.main = arrStr(data.main)
                data.info = strObj(data.info)
            }
            return data
        },
        // 设置表单对话框数据
        setFormData (type, i, row = {}) {
            let data = this.details.records[i].formField(type)
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
        }
    },
    mounted () {
    	this.getDetailMsg()
    }
}
</script>
<style lang="sass">
$theme-color: #1eac94;
.commonDetails{
    height: 100%;
    overflow: auto;
	.cd_top{
		>img {
		  	width: 96%;
		  	max-height: 200px;
		  	margin:1% 2% 0px;
		}
		.cd_t_conent{
			.weui-media-box__title{
				font-size: .4rem;
			}
			.weui-media-box__desc{
				font-size: .3rem;
			}
			.weui-panel:before{
				border-top: none
			}
			.weui-panel:after{
				border-bottom: none
			}
			.weui-cells{
				margin-top:0px;
				font-size: .3rem;
			}
		}
		.cd_t_more{
			line-height: 1rem;
			padding-left: 10px;
			color: $theme-color;
		}
	}
	.cd_bottom{
		width: 90%;
		margin: 0 auto;
		padding-top: .5rem;
		.flex-demo {
			padding: .1rem 0px;
			margin-bottom: .4rem;
		  	text-align: center;
		 	color: #b3b1b2;
		  	border: 1px solid #b3b1b2;
		  	border-radius: 10px;
		  	background-clip: padding-box;
		}
		.flex-demo:hover{
			color: $theme-color;
		  	border: 1px solid $theme-color;
		}
	}
} 
</style>
