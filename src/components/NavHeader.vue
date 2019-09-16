<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            :router="true"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
    >
        <el-menu-item index="/home_door">首页</el-menu-item>
        <el-submenu index="2" style="margin-right: auto;">
            <template slot="title">我的工作台</template>
            <el-menu-item index="/workspace">工作区仓库</el-menu-item>
            <el-menu-item index="2-1">mt4工作区</el-menu-item>
            <el-menu-item index="2-2">mt5工作区</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">个人中心</el-menu-item>
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="registe">注册</el-menu-item>
        <!--<div style="display: inline-block;height: 100%;min-width: 2em;">
            <b>登录</b>
        </div>-->
    </el-menu>
</template>
<script>
    export default {
        name: "NavHeader",
        data(){
            return{
                activeIndex: "/home_door"
            }
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>

<style scoped>
    .el-menu-demo{
        display: flex;
        justify-content: flex-start;
        background-color: #2c3e50;
    }
</style>