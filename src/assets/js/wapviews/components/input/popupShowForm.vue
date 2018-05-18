<!-- 用来展示数据用的 -->
<template>
	<div v-transfer-dom>
        <popup v-model="isShowPopup" height="100%" width='100%' position="right">
            <div class="popup1">
                <x-header :left-options="{showBack: false}">
                    <a slot="left" @click="handleClose">关闭</a>
                </x-header>
                <group>
                    <cell
                        v-for="(item,i) in introduceListField"
                        :key="i"
                        :title="`${item.label}：`"
                        :value="listData[item.field]">
                        <img v-if="item.label === '外观' && listData[item.field]!==null" :src="listData[item.field]" style="width: 50px;height:50px;">
                    </cell>
                </group>
            </div>
        </popup>
    </div>
</template>
<script>
import {TransferDom, XHeader, Cell, Popup, Group} from 'vux'

export default {
    directives: {
        TransferDom
    },
    components: {
    	TransferDom, XHeader, Cell, Popup, Group
    },
    props: {
    	isShowPopup: {
    		type: Boolean,
    		default: false
    	},
    	introduceListField: {
    		type: Array,
    		default: []
    	},
    	listData: {
    		type: Object,
    		default () {
    			return {}
    		}
    	}
    },
    mounted () {
    },
    methods: {
    	handleClose () {
    		this.$emit('close')
    	}
    }
}
</script>
<style lang="sass">
</style>
