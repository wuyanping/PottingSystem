<!-- 负责人页 -->
<template>
	<div class="leader">
        <swipeout>
            <swipeout-item v-for="(pItem,i) in listData" :key="i" :disabled="disabled">
                <div slot="right-menu">
                    <swipeout-button @click.native="onButtonClick(pItem.id)" background-color="#D23934">删除</swipeout-button>
                </div>
                <div slot="content" class="vux-1px-t">
                    <cell>
                        <span align-items="flex-start" slot="title">{{pItem.name}}</span>
                    </cell>
                </div>
            </swipeout-item>
        </swipeout>
	<!-- 	<group name="">
            <cell-box 
                v-for="(item,i) in listData"
                :key="i">
                {{item}}
            </cell-box>
	    </group> -->
	</div>
</template>
<script>
import { Cell, Group, CellBox, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { index } from 'UTILS/commonApi.js'
import { isArray } from 'UTILS/utils.js'

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
            listData: [{id: 1, name: 'aa'}]
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
            console.log(this.$route)
            index(this, `pot/${id}/main`)
                .then(res => {
                    console.log(res)
                    this.listData = res
                })
        },
        onButtonClick (i) {
            console.log('onButtonClick')
        }
    },
    mounted () {
        this.$emit('setHeader', {key: 'showBack', value: true})
        this.getMsg()
    },
    destroyed () {
    	this.$emit('setHeader', {key: 'showBack', value: false})
    }
}
</script>
<style lang="sass">
.leader{
    .weui-cells{
        margin-top: 0;
        .weui-cell{
            padding: 20px;
        }
    }  
}
</style>
