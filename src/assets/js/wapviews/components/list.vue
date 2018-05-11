<template>
	<div class='list'>
        <swipeout>
            <swipeout-item v-for="(pItem,i) in data" :key="i">
                <div slot="right-menu" v-if="(pItem.main).join()===user">
                    <swipeout-button @click.native="onButtonClick('edit', pItem.id)" background-color="#336DD6">编辑</swipeout-button>
                    <swipeout-button @click.native="onButtonClick('delete', pItem.id)" background-color="#D23934">删除</swipeout-button>
                </div>
                    <div slot="content">
                            <cell
                                is-link
                                @click.native="toDetail(pItem.id)">
                                <img slot="icon" width="90" v-if="Object.keys(pItem).includes('imgs')"  style="display:block;margin-right:5px;" :src="pItem.imgs ? `/api/${pItem.imgs}` : fallbackSrc">
                                <span align-items="flex-start" slot="title">{{pItem.name}}</span>
                                <span slot="inline-desc" class="list-inlinedesc">{{pItem.use_for}}</span>
                            </cell>
                    </div>
            </swipeout-item>
        </swipeout>
        <load-more :show-loading="false" v-if="isNoMsg" />
	</div>
</template>
<script>
import { Cell, CellBox, Group, Badge, Swipeout, SwipeoutItem, SwipeoutButton, LoadMore } from 'vux'
export default {
    components: {
        Cell, CellBox, Group, Badge, Swipeout, SwipeoutItem, SwipeoutButton, LoadMore
    },
    data () {
        return {
            fallbackSrc: './static/image/company_default_logo.png',
            flag: true,
            user: window.bdUser.name
        }
    },
    props: {
        data: {
            type: Array,
            default: []
        },
        isNoMsg: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onButtonClick (val, i) {
            this.$emit('onButtonClick', val, i)
        },
        toDetail (id) {
            this.$emit('toDetail', id)
        }
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
