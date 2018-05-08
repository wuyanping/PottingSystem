<!-- 负责人页 -->
<template>
	<div class="leader">
		<group name="">
		    <cell
		    	v-for="(item,i) in list"
		    	:key="i"
		    	:title="`${item.title}：`"
		    	:value="listData[item.key]">
		    </cell>
	    </group>
	</div>
</template>
<script>
import { Cell, Group } from 'vux'
import { index } from 'UTILS/commonApi.js'
import { isArray } from 'UTILS/utils.js'

export default {
    components: {
        Cell, Group
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
            listData: {}
        }
    },
    methods: {
        getMsg () {
            let id = this.$route.params.id
            index(this, `pot/${id}`)
                .then(res => {
                    res['main'] = this.arrStr(res['main'])
                    this.listData = res
                })
        },
        arrStr (arr) {
            let arrString = ''
            if (isArray(arr)) {
                arrString = arr.join()
            }
            return arrString
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
