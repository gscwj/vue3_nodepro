<template>
    <el-container>
        <el-header>
            <NavHeader></NavHeader>
        </el-header>
        <el-main>
            <div class="home">
                <cat_test></cat_test>
                <el-button type="success" size="mini" @click="query_node">请求node接口1</el-button>
                <el-button type="success" size="mini" @click="download">下载文件1</el-button>
                <a href="http://127.0.0.1:3000/files/download/234">下载文件2</a>
            </div>
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
    import HelloWorld from '@/components/HelloWorld.vue'
    import cat_test from '@/components/cat_test.vue'
    import NavHeader from "../components/NavHeader";

    export default {
        name: 'home',
        components: {
            NavHeader,
            HelloWorld,
            cat_test
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
            query_node() {
                this.$axios.post('/api/users/userInfo')
                    .then(res => {
                        console.log("res =", res);
                    })
                    .catch(err => {
                        console.log("err =", err);
                    })
            },
            download() {
                this.$axios.get('/api/files/download/123', {
                    responseType: 'blob',
                    withCredentials: true,
                    mode: 'no-cors',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'X-Requested-With': 'XMLHttpRequest',
                        // 'Content-Type': 'application/force-download',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(res => {
                        console.log("接收到的数据：", res);

                        this.$DownloadFile(res);
                    })
                    .catch(err => {s
                        console.error(err.stack);
                    })
            }
        },
        created() {

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
