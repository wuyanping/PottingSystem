<template>
	<div class="list">
        <swipeout v-if="data.length > 0">
            <swipeout-item v-for="(pItem,i) in data" :key="i" :disabled="disabled">
                <div slot="right-menu">
                    <swipeout-button @click.native="onButtonClick('edit', pItem.id)" background-color="#336DD6">编辑</swipeout-button>
                    <swipeout-button @click.native="onButtonClick('delete', pItem.id)" background-color="#D23934">删除</swipeout-button>
                </div>
                    <div slot="content" class="vux-1px-t">
                        <cell
                            is-link
                            @click.native="toDetail(pItem.id)">
                            <img slot="icon" width="90" height="80" v-if="Object.keys(pItem).includes('imgs')"  style="display:block;margin-right:5px;" :src="pItem.imgs ? `${pItem.imgs}` : fallbackSrc">
                            <span align-items="flex-start" slot="title">{{pItem.name}}</span>
                            <span slot="inline-desc" class="list-inlinedesc">{{pItem.variety}}</span>
                        </cell>
                    </div>
            </swipeout-item>
        </swipeout>
        <load-more v-else :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
        <load-more tip="已加载全部数据" :show-loading="false" v-if="isNoMsg" />
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
    .vux-1px-t:before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        color: #c7c7c7;
    }
    .vux-1px-t:before {
        top: 0;
        border-top: 1px solid #c7c7c7;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }
}
</style>
