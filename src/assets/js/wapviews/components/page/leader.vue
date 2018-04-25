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
export default {
    components: {
        Cell, Group
    },
    data () {
        return {
        	list: [
		    	{
		    		title: '盆栽名称',
		    		key: 'name',
		    		value: ''
		    	},
		    	{
		    		title: '品种',
		    		key: 'pz',
		    		value: ''
		    	}
		    ],
            listData: {
                name: 'name111',
                key: 'pz1111'
            }
        }
    },
    mounted () {
        this.$emit('setHeader', {key: 'showBack', value: true})
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
