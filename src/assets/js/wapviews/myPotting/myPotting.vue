<template>
	<div>
		<p><span>全部盆栽</span><span>新增盆栽</span></p>
        <group>
          <x-input>
            <img slot="right-full-height" src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg">
          </x-input>
        </group>
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
</style>
