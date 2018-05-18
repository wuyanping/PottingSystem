<!-- 负责人页 -->
<template>
	<div class="leader">
        
        <!-- <group title="tip：主要负责人可以删除负责人，左滑可删除">
            <cell>
                <span align-items="flex-start" slot="title">主要负责人：{{mainPerson.name}}</span>
            </cell>
            <swipeout>
                <swipeout-item v-for="(pItem,i) in listData" :key="i" :disabled="disabled">
                    <div slot="right-menu">
                        <swipeout-button @click.native="onButtonClick(pItem.id)" background-color="#D23934">删除</swipeout-button>
                    </div>
                    <div slot="content" class="vux-1px-t">
                        <cell>
                            <span align-items="flex-start" slot="title">负责人：{{pItem.name}}</span>
                        </cell>
                    </div>
                </swipeout-item>
            </swipeout>
        </group> -->
		<group name="">
            <cell-box 
                v-for="(item,i) in listData"
                :key="i">
                {{item.main === 1 ? '主要负责人：' : '负责人：'}}{{item.name}}
            </cell-box>
	    </group>
	</div>
</template>
<script>
import { Cell, Group, CellBox, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { index } from 'UTILS/commonApi.js'
import { isArray } from 'UTILS/utils.js'
import { ajax } from 'UTILS/ajax'

export default {
    components: {
        Cell, Group, CellBox, Swipeout, SwipeoutItem, SwipeoutButton
    },
    data () {
        return {
        	list: [
		    	{
		    		title: '名称',
		    		key: 'main',
		    		value: ''
		    	},
		    	{
		    		title: '品种',
		    		key: 'variety',
		    		value: ''
		    	}
		    ],
            listData: [{id: 1, name: 'aa'}],
            mainPerson: {}
        }
    },
    computed: {
        disabled () {
            if (this.$route.params.model === 'potting') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        getMsg () {
            let id = this.$route.params.id
            index(this, `pot/${id}/main`)
                .then(res => {
                    // let arr = []
                    // res.forEach(item => {
                    //     if (item.main !== 1) {
                    //         arr.push(item)
                    //     } else {
                    //         this.mainPerson = item
                    //     }
                    // })
                    // this.listData = arr
                    this.listData = res
                })
        },
        onButtonClick (id) {
            // 更改盆栽通过状态
            let params = {
                status: false
            }
            ajax('put', this.$apiUrl(`apply/${id}`), params, data => {
                if (data !== 500) {
                    this.swtich_option_tableData({data: data, id: data.id})
                    this.$mg(this, '已删除', 'success', 1000)
                }
            })
        },
        // 通过后替换当前列表中的数据
        swtich_option_tableData ({data, id}) {
            // data = this.model.tableFieldFn ? this.model.tableFieldFn(data) : data
            this.listData.forEach(v => {
                if (v.id === id) {
                    v.isagree = data.isagree
                }
            })
        }
    },
    mounted () {
        this.$emit('setHeader', {key: 'showBack', value: true})
    },
    created () {
        this.getMsg()
    },
    destroyed () {
    	this.$emit('setHeader', {key: 'showBack', value: false})
    }
}
</script>
<style lang="sass">
.leader{
    height: 100%;
    overflow: auto;
    .weui-cells{
        margin-top: 0;
        .weui-cell{
            padding: 20px;
        }
    }  
}
</style>
