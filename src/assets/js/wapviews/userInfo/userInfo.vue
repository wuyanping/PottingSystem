<template>
	<div class="userInfo">
		<blur :blur-amount=40 :url="url" :height="100">
            <div class="center clearfix">
                <img :src="url" class="fl">
                <div class="fl p-10">
                    <p>wuyanping</p>
                    <p>个人信息 > </p>
                </div>
            </div>
    	</blur>
        <group>
            <cell title="修改个人信息" is-link link="userInfo/editUserInfo"></cell>
            <cell title="修改密码" is-link link="userInfo/editPassword"></cell>
        </group>
	</div>
</template>
<script>
import { Blur, Group, Cell } from 'vux'
import PopupForm from 'WAPVIEWS/components/input/popupForm.vue'
export default {
    components: {
        Blur, Group, Cell
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
      text-align: left;
      padding: 20px 10px 0 10px;
      font-size: 18px;
    }
    .center img {
      width:60px;
      height: 60px;
      border-radius: 50%;
      border: 4px solid #ececec;
    }
    .weui-cells{
        margin-top: 0;
        .weui-cell{
            padding: 20px 15px;
        }
    }  
}
</style>
