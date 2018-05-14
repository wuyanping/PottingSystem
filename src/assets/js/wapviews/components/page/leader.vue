<!-- 负责人页 -->
<template>
	<div class="leader">
		<group name="">
		    <!-- <cell
		    	v-for="(item,i) in list"
		    	:key="i"
		    	:title="`${item.title}：`"
		    	:value="listData[item.key]">
		    </cell> -->
            <cell-box 
                v-for="(item,i) in listData"
                :key="i">
                {{item}}
            </cell-box>
	    </group>
	</div>
</template>
<script>
import { Cell, Group, CellBox } from 'vux'
import { index } from 'UTILS/commonApi.js'
import { isArray } from 'UTILS/utils.js'

export default {
    components: {
        Cell, Group, CellBox
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
            listData: []
        }
    },
    methods: {
        getMsg () {
            let id = this.$route.params.id
            index(this, `pot/${id}`)
                .then(res => {
                    // res['main'] = this.arrStr(res['main'])
                    this.listData = res.main ? res.main : []
                })
        }
        // arrStr (arr) {
        //     let arrString = ''
        //     if (isArray(arr)) {
        //         arrString = arr.join()
        //     }
        //     return arrString
        // }
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
