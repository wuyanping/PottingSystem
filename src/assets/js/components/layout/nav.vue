<template>
    <div>
        <el-menu
	        default-active="2"
	        class="el-menu-vertical-demo"
            :default-openeds="defaultOpeneds"
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
export default {
    name: 'pNav',
    props: {
    	menu: {
    		type: Array,
    		default: []
    	},
        defaultOpeneds: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
    	return {
    		router: true
    	}
    },
    mounted () {
    	// console.log(this.menu)
    },
    methods: {
        handleOpen (key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath)
        },
        handelSelect (index, indexPath) {
        	// index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
        	// console.log(index, indexPath)
        }
    }
}
</script>

<style>
</style>