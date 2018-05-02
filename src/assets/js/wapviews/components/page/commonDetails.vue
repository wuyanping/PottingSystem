<!-- 一级详情页 -->
<template>
	<div class="commonDetails">

		<!-- 盆栽介绍 -->
		<div class="cd_top">
			<img v-if="hasIntroduceImg" :src="url" />
			<div v-if="hasIntroduce" class="cd_t_conent">
				<panel :list="introduce" type="2"></panel>
  				<group>
				    <cell
				    	v-for="(item,i) in introduceListField"
				    	:key="i"
				    	:title="`${item.label}：`"
				    	:value="listData[item.field]">
				    </cell>
			    </group>
			    <div class="cd_t_more">更多信息 ></div>
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
    props: {
    	details: Object
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
		    listData: {
		    	name: 'name111',
		    	variety: 'pz1111'
		    }
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
.commonDetails{
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
