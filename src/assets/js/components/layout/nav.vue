<template>
    <div>
        <el-menu
	        :default-active="record"
	        class="el-menu-vertical-demo"
	        @select="handelSelect"
	        background-color="#545c64"
	        text-color="#fff"
	        active-text-color="#ffd04b"
	        :router="router">
	        <el-submenu v-for="(menuItem, index) in menu" :index="menuItem.key" :key="index">
	            <template slot="title">
	                <i class="el-icon-location"></i>
	                <span>{{menuItem.name}}</span>
	            </template>
                <el-menu-item v-for="(subMenuItem, sIndex) in menuItem.children" :index="`/index/${menuItem.key}/${subMenuItem.key}`" :key="sIndex">{{subMenuItem.name}}</el-menu-item>
	        </el-submenu>
	    </el-menu>
    </div>
</template>

<script>
import {mapGetters, mapMutation, mapActions} from 'vuex'
export default {
    name: 'pNav',
    props: {
    	menu: {
    		type: Array,
    		default: []
    	}
    },
    data () {
    	return {
    		router: true
    	}
    },
    computed: {
        ...mapGetters({
            record: 'getRecord',
            // ture/关闭侧边栏 false/开启侧边栏
            isShowSiderBar: 'getSiderBar'
        })
    },
    mounted () {
    	// console.log(this.menu)
    },
    methods: {
        ...mapActions([
            'switch_record',
            'change_siderBar'
        ]),
        handleOpen (key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath)
        },
        handelSelect (index, indexPath) {
        	// index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
        	// console.log(index, indexPath)
            // this.record = index
            this.switch_record(index)
            this.change_siderBar(false)
        }
    },
    watch: {
        isShowSiderBar () {
            if (this.isShowSiderBar) {
                // this.$children[0].closeMenu()
                this.$children[0].activedIndex = ''
                this.$store.dispatch('switch_record', '')
            }
        }
    }
}
</script>

<style>
</style>