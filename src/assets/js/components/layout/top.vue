/**
 * 公共组件
 * @description 头部组件
 * @author wuyanping
 * @date 2018/4/17
 */
<template>
    <div class="top h100">
        <ul class="top-opts h100 fr clearfix">
			<li class="fl h100" @click="changeSub">
                <router-link to="/index/userInfo">
                    <i class="inline-block w100 icon iconfont icon-rencai "></i>
                    <span>用户信息</span>
                </router-link>
			</li>
			<li class="fl h100" @click="logout()">
				<i class="inline-block w100 icon iconfont icon-tuichu"></i>
				<span>退出</span>
			</li>
		</ul>
    </div>
</template>

<script>
import {ajax} from '../../utils/ajax.js'
import {mapActions} from 'vuex'
export default {
    name: 'Top',
    methods: {
        ...mapActions([
            'switch_record',
            'change_siderBar'
        ]),
        // userInfo () {
        //     this.$router.push('/index/userInfo')
        // },
        logout () {
            ajax.call(this, 'post', '/api/logout', data => {
            	this.$router.push('/login')
                this.switch_record('')
                this.change_siderBar(true)
            })
        },
        changeSub () {
            this.change_siderBar(true)
        }
    }
}
</script>

<style lang="sass">
.top-opts{
    li{
        border-right: 1px solid rgb(0, 135, 181);
        color: white;
        max-width: 100px;
        min-width: 66px;
        text-align: center;
        cursor: pointer;
        a{
            display:inline-block;
            width:100%;
            height:100%;
            color: white;
        }
        &:hover{
            transition:background 1.5s ease-out;
            background:rgba(0,0,0,.2);
        }
        .router-link-active{
            background:rgba(0,0,0,.2);
        }
    }
    li:last-child{
        border-right: none;
    }
}
</style>