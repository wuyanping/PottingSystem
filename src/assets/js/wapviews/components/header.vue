<template>
	<x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">with more menu</x-header>
</template>
<script>
import { XHeader } from 'vux'
export default {
    data () {
        return {
        	showMore: false
        }
    },
    components: {
    	XHeader
    }
}
</script>
<style>
</style>
