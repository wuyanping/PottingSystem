<template>
    <div class="myPotting">
    	<div class="mp_top">
    		<div><span>全部盆栽</span><span>新增盆栽</span></div>
            <input type="text">
    	</div>
    </div>
</template>
<script>
import { XInput, Group, XButton, Cell } from 'vux'
export default {
    components: {
        XInput, Group, XButton, Cell
    },
    data () {
        return {
            value: ''
        }
    }
}
</script>
<style lang="sass">
.myPotting {

}
</style>
