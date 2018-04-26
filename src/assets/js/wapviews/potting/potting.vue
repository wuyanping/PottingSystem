<template>
	<div class='potting'>
		<!-- <list :data="data" :link="link"></list> -->
        <panel :list="list" type="5" @on-click-item="handlePanelItem" @on-img-error="onImgError"></panel>
	</div>
</template>
<script>
// import List from '../components/list'
import { Panel } from 'vux'
export default {
    components: {
        // List,
        Panel
    },
    data () {
        return {
            data: [
                {
                    id: 1,
                    title: 'potting1',
                    inlineDesc: 'inlineDesc1',
                    img: './static/image/company_default_logo.png'
                },
                {
                    id: 2,
                    title: 'potting2',
                    inlineDesc: 'inlineDesc2',
                    img: './static/image/company_default_logo.png'
                }
            ],
            link: 'potting',
            list: [
                {
                    id: 1,
                    src: 'http://somedomain.somdomain/x.jpg',
                    fallbackSrc: './static/image/company_default_logo.png', // 默认没有图片显示的地址
                    title: '标题一标题一标题一标题一标题一标题一标题一',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                },
                {
                    id: 2,
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题二',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                }
            ]
        }
    },
    methods: {
        onImgError (item, $event) {
            console.log(item, $event)
        },
        handlePanelItem (panelItem) {
            console.log(panelItem)
            console.log(this.$route)
            this.$router.push(`${this.$route.path}/${panelItem.id}`)
        }
    }
}
</script>
<style lang='sass' scoped>
</style>
