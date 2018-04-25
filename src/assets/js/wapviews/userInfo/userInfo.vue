<template>
	<div class="userInfo">
		<blur :blur-amount=40 :url="url">
            <p class="center"><img :src="url"></p>
            <p class="center">aaaa</p>
	    </blur>
	</div>
</template>
<script>
import { Blur } from 'vux'
export default {
    components: {
        Blur
    },
    data () {
        return {
            url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
        }
    }
}
</script>
<style lang="sass">
.userInfo{
    .center {
      text-align: center;
      padding-top: 20px;
      color: #fff;
      font-size: 18px;
    }
    .center img {
      width:70px;
      height: 70px;
      border-radius: 50%;
      border: 4px solid #ececec;
    }
}
</style>
