<template>
	<div class='potting'>
		<group>
            <cell
                v-for="(pItem,i) in data"
                :key="i"
                is-link
                :link="`/index/potting/${pItem.id}`">
                <img slot="icon" width="90" style="display:block;margin-right:5px;" :src="pItem.img">
                <span align-items="flex-start" slot="title">{{pItem.title}}</span>
                <span slot="inline-desc" class="potting-inlinedesc">{{pItem.inlineDesc}}</span>
            </cell>
    	</group>
	</div>
</template>
<script>
import { Cell, CellBox, Group, Badge } from 'vux'
export default {
    components: {
        Cell, CellBox, Group, Badge
    },
    data () {
        return {
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
            ]
        }
    }
}
</script>
<style lang='sass' scoped>
.potting {
    .potting-title{
        /*display: inline-block;*/
        /*width: 200px;*/
    }
    .potting-inlinedesc{
        display: inline-block;
        width: 6rem;
        word-break:break-all;
    }
}
</style>
