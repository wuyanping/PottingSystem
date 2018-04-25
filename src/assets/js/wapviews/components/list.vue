<template>
	<div class='list'>
		<group>
            <cell
                v-for="(pItem,i) in data"
                :key="i"
                is-link
                :link="`/index/${link}/${pItem.id}`">
                <img slot="icon" width="90" style="display:block;margin-right:5px;" :src="pItem.img">
                <span align-items="flex-start" slot="title">{{pItem.title}}</span>
                <span slot="inline-desc" class="list-inlinedesc">{{pItem.inlineDesc}}</span>
            </cell>
    	</group>
	</div>
</template>
<script>
import { Cell, CellBox, Group, Badge } from 'vux'
export default {
    components: {
        Cell, CellBox, Group, Badge
    },
    props: {
        data: {
            type: Array,
            default: []
        },
        link: ''
    }
}
</script>
<style lang='sass' scoped>
.list {
    .list-title{
        /*display: inline-block;*/
        /*width: 200px;*/
    }
    .list-inlinedesc{
        display: inline-block;
        width: 6rem;
        word-break:break-all;
    }
}
</style>
