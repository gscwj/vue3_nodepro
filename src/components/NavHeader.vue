<template>
    <div style="position: relative">
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                :router="true"
                mode="horizontal"
                @select="handleSelect"
                background-color="rgba(60,143,157,0.8)"
                text-color="#fff"
                active-text-color="#ffd04b"
        >
            <el-menu-item index="/home_door" :class="{'nav_spector':!is_login}">首页</el-menu-item>
            <!--        <el-menu-item index="/echartsLiquidfill">水纹球图</el-menu-item>-->
            <el-submenu index="2" class="nav_spector" v-show="is_login">
                <template slot="title">我的工作台</template>
                <el-menu-item index="/workspace">工作区仓库</el-menu-item>
                <el-menu-item index="2-1">mt4工作区</el-menu-item>
                <el-menu-item index="2-2">mt5工作区</el-menu-item>
            </el-submenu>
            <el-menu-item index="center" v-show="is_login">个人中心</el-menu-item>
            <el-menu-item index="login_" v-show="!is_login" :route="{path: null}">登录</el-menu-item>
            <el-menu-item index="regist_" v-show="!is_login" :route="{path: null}">注册</el-menu-item>
            <el-menu-item index="logout_" v-show="is_login" :route="{path: null}">退出</el-menu-item>
            <!--<div style="display: inline-block;height: 100%;min-width: 2em;">
                <b>登录</b>
            </div>-->
        </el-menu>
        <div class="user_info">
            <span>欢迎,</span>
            <span class="user_name">小明</span>
        </div>
    </div>

</template>
<script>
    import { mapMutations } from 'vuex'
    export default {
        name: "NavHeader",
        props:{
            activeMenu: {
              type: String,
              default: "/home_door"
            },
            isLogin:{
                type: Boolean,
                required: true
            }
        },
        computed:{
            is_login(){
                return this.isLogin;
            }
        },
        data(){
            return{
                activeIndex: this.activeMenu,
            }
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                if(key==='login_'){
                    this.open_login_form();
                }
                else if(key==='logout_'){
                    this.$confirm('是否确认退出当前用户？','警告',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        this.$axios.post('/api/users/logoutd',{
                        })
                            .then(res => {
                                console.log("注销用户：res =",res);
                                this.go_logout();
                            })
                            .catch(err => {
                                console.log("err =", err);
                            })
                    }).catch((err)=>{
                        console.error(err);
                    });
                    /*this.$alert('您将退出当前用户，请确认!',{
                       confirmButtonText: '确定',
                       callback: action=>{
                           this.go_logout();
                       }
                    });*/
                }
            },
            ...mapMutations({
                open_login_form: 'open_login_form', // 映射 this.add() 为 this.$store.commit('increment')
                go_logout: 'do_logout' // 映射 this.add() 为 this.$store.commit('increment')
            })
        },
    }
</script>

<style scoped>
    .el-menu-demo{
        display: flex;
        justify-content: flex-start;
        background-color: #2c3e50;
    }
    .nav_spector{
        margin-right: auto;
    }
    .user_info{
        font-size: 0.9rem;
        /*font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;*/
        position: absolute;
        top: 1%;
        right: 12em;
        /*background-color: #67CF22;*/
        height: 95%;
        width: 7em;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: end;
        padding: 5px;
        box-sizing: border-box;
        color: #67CF22;
    }
    .user_name{
        font-size: 1.2em;
    }
</style>