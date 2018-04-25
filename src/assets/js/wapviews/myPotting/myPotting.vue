<template>
    <div class="myPotting">
    	<div class="mp_top">
    		<flexbox>
                <flexbox-item :span="5">
                    <div class="mp_top_l">
                        <span class="active">全部盆栽</span><span>新增盆栽</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <x-input class="weui-vcode mp_top_r">
                        <icon slot="right" type="search"></icon>
                    </x-input>
                </flexbox-item>
            </flexbox>
    	</div>
        <div class="mp_list">
            <!-- <List :data='data' :link="link"></List> -->
            <panel :list="list" type="5" @on-click-item="handlePanelItem" @on-img-error="onImgError"></panel>
        </div>
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel } from 'vux'
// import List from '../components/list'
export default {
    components: {
        // List,
        XInput,
        Group,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel
    },
    data () {
        return {
            value: '',
            data: [
                {
                    id: 1,
                    title: 'potting1',
                    inlineDesc: 'inlineDesc1',
                    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
                },
                {
                    id: 2,
                    title: 'potting2',
                    inlineDesc: 'inlineDesc2',
                    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
                }
            ],
            link: 'myPotting',
            list: [
                {
                    id: 0,
                    src: 'http://somedomain.somdomain/x.jpg',
                    fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题一标题一标题一标题一标题一标题一标题一',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    // ,
                    // url: '/component/cell'
                },
                {
                    id: 2,
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题二',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    // ,
                    // url: {
                    //     path: '/component/radio',
                    //     replace: false
                    // },
                    // meta: {
                    //     source: '来源信息',
                    //     date: '时间',
                    //     other: '其他信息'
                    // }
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

<style lang="sass">
.myPotting {
    .mp_top{
        padding: 5px;
        color: #727071;
        .mp_top_l {
            >span{
                display:inline-block;
                padding: 5px;
            }
            >span:first-child{
                border-right: 1px solid #c6c5ca;
            }
            >span.active{
                color: #1eac94;
            }
        }
        .mp_top_r{
            border: 1px solid #78c1ae;
        }
        .weui-cell{
            padding: 5px 13px;
        }
    }
    .mp_list{
        .weui-cells{
            margin-top:5px;
        }
    }
}
</style>
