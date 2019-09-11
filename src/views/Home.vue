<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
      <cat_test></cat_test>
      <el-button type="success" size="mini" @click="query_node">请求node接口1</el-button>
      <el-button type="success" size="mini" @click="download">下载文件1</el-button>
      <a href="http://127.0.0.1:3000/files/download/234">下载文件2</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import cat_test from '@/components/cat_test.vue'
export default {
    name: 'home',
    components: {
    HelloWorld,
    cat_test
    },
    data(){
        return{
            host: 'http://127.0.0.1:3000',
            host1: '/api/cat',
            get_config:{
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
    methods:{
        query_node(){
            this.$axios.post('/api/users/userInfo')
                .then(res=>{
                    console.log("res =",res);
                })
                .catch(err=>{
                    console.log("err =",err);
                })
        },
        download(){
            this.$axios.get('/api/files/download/123',{
                responseType: 'blob',
                withCredentials: true,
                mode: 'no-cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'X-Requested-With': 'XMLHttpRequest',
                    // 'Content-Type': 'application/force-download',
                    'Access-Control-Allow-Origin':'*'
                }
            })
                .then(res=>{
                    console.log("接收到的数据：",res);

                    this.$DownloadFile(res);
                })
                .catch(err=>{
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
