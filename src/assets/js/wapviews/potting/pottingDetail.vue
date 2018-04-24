<template>
	<div class='pottingDetail'>
    details
	</div>
</template>
<script>
import {} from 'vux'
export default {
    components: {
    },
    data () {
        return {
            data: [
            ]
        }
    },
    mounted () {
        this.$emit('setHeader', {showBack: true})
    }
}
</script>
<style lang='sass' scoped>
</style>
