<template>
    <el-container style="height: 100%">
        <el-header height="66px"><top></top></el-header>
        <el-container>
            <el-aside width="200px">
                <pNav :menu="menu" :defaultOpeneds="defaultOpeneds"></pNav>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import pNav from 'COMPONENTS/layout/nav'
import Top from 'COMPONENTS/layout/top'
import menu from 'PAGE/top/menu.js'

export default {
    name: 'index',
    data () {
        return {
            menu: menu,
            defaultOpeneds: []
        }
    },
    components: {
        pNav,
        Top
    }
}
</script>

<style lang="sass">
@import '../../sass/theme/_theme.scss';
.el-header, .el-footer {
    background-color: $blue_color;
    color: #333;
}

.el-aside {
    background-color: #545c64;
    color: #333;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
}

body > .el-container {
    margin-bottom: 40px;
}

</style>