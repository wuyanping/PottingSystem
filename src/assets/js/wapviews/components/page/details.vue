<!-- 一级详情页 -->
<template>
	<div class="details">
		<div class="d_top">
			<img :src="url" />
			<div class="d_t_conent">
				<panel :list="introduce" type="2"></panel>
  				<group>
				    <cell
				    	v-for="(item,i) in list"
				    	:key="i"
				    	:title="`${item.label}：`"
				    	:value="listData[item.field]">
				    </cell>
			    </group>
			</div>
			<div class="d_t_more">更多信息 ></div>
		</div>

		<div class="grey_line"></div>

		<div class="d_bottom">
			<flexbox :gutter="0" wrap="wrap" justify="space-between">
		      	<flexbox-item
		      		:span="2/7"
		      		v-for='(rItem,i) in records'
		      		:key="i"
		      		@click.native="go(rItem)">
		      		<div class="flex-demo" >
		      			<i :class="`icon iconfont icon-${rItem.record}`"></i>
		      			<p>{{rItem.title}}</p>
		      		</div>
		      	</flexbox-item>
		    </flexbox>
		</div>
	</div>
</template>
<script>
import { Flexbox, FlexboxItem, Blur, Panel, Group, Cell } from 'vux'
export default {
    components: {
        Blur,
        Flexbox,
        FlexboxItem,
        Panel,
        Group,
        Cell
    },
    data () {
        return {
            url: './static/image/company_default_logo.png',
            // 介绍
            introduce: [{
		        title: '标题一',
		        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
		    }],
		    // 介绍列表
		    list: [
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
		    listData: {
		    	name: 'name111',
		    	variety: 'pz1111'
		    },
		    // 记录
		    records: [
		    	{
		    		title: '节点记录',
		    		record: 'node'
		    	},
		    	{
		    		title: '浇水记录',
		    		record: 'water'
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
        }
    },
    mounted () {
    	console.log(22)
        this.$emit('setHeader', {key: 'showBack', value: true})
        this.$emit('setHeader', {key: 'title', value: '盆栽详情'})
    },
    destroyed () {
    	this.$emit('setHeader', {key: 'showBack', value: false})
    },
    methods: {
    	go ({title, record}) {
    		console.log('gogo')
    		this.$emit('setHeader', {key: 'title', value: title})
    		this.$router.push(`${this.$route.path}/${record}`)
    	}
    }
}
</script>
<style lang="sass">
$theme-color: #1eac94;
.details{
	.d_top{
		>img {
		  	width: 96%;
		  	max-height: 200px;
		  	margin:1% 2% 0px;
		}
		.d_t_conent{
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
		.d_t_more{
			line-height: 1rem;
			padding-left: 10px;
			color: $theme-color;
		}
	}
	.d_bottom{
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
