<template>
    <el-container>
        <el-header>
            <NavHeader></NavHeader>
        </el-header>
        <el-main>
            <router-view style="width: 100%!important;"/>
        </el-main>
        <el-footer>
            <footer>
                jksdkfjsldf<br/>
                吉林省的看法加快速度
            </footer>
        </el-footer>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import NavHeader from "../components/NavHeader";

    export default {
        name: 'home',
        components: {
            NavHeader,
        },
        data() {
            return {
                host: 'http://127.0.0.1:3000',
                host1: '/api/cat',
                get_config: {
                    // withCredentials: true,
                    // credential: 'same-origin',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            }
        },
        methods: {

        },
        created() {
            console.log("进入Home首页");
        },
        beforeDestroy() {

        },
        destroyed() {

        }
    }
</script>
<style lang="scss">
    body > .el-container {
        margin-bottom: 40px;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        padding: 0!important;
        position: sticky;
        top: 0;
    }

    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        min-height: 10em;
        & footer{
            line-height: 3em;
            color: rebeccapurple;
            font-size: 14px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        }
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>
