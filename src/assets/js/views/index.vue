<template>
    <el-container style="height: 100%">
        <el-header height="66px"><top></top></el-header>
        <el-container>
            <el-aside width="200px">
                <pNav></pNav>
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

export default {
    name: 'index',
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
    text-align: center;
    /*line-height: 60px;*/
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    /*line-height: 260px;*/
}

.el-container:nth-child(7) .el-aside {
    /*line-height: 320px;*/
}
</style>