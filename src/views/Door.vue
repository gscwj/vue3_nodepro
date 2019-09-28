<template>
    <div class="home">
        <cat_test></cat_test>
        <el-button type="success" size="mini" @click="query_node">请求node接口1</el-button>
        <el-button type="success" size="mini" @click="download">下载文件1</el-button>
        <a href="http://127.0.0.1:3000/files/download/234">下载文件2</a>
        <el-button type="success" size="mini" @click="showLiquidfil">展示水纹球图</el-button>
        <el-row>
            <el-col>
                <el-button type="success" size="mini" @click="array2tree_test">测试对象数组转换成树</el-button>
                <el-button type="success" size="mini" @click="tree2array_test">测试对象数组转换成树</el-button>
                <el-button type="success" size="mini" @click="getCascadeFromTree">摘取出来树的关联父级对象数组</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
<!--                <el-button type="success" size="mini" @click="getEarth">地图接口测试</el-button>-->
                <el-button type="success" size="mini" @click="regist">注册测试</el-button>
            </el-col>
        </el-row>

        <div id="echartsLiquidfill" class="echartsLiquidfill_class">
            
        </div>
    </div>
</template>

<script>
    import HelloWorld from '../components/HelloWorld.vue'
    import cat_test from '../components/cat_test.vue'
    import ApiUtil from '../common-utils/apiUtil'
    import Fetchjsonp from 'fetch-jsonp';
    export default {
        name: "Door",
        components: {
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
                        // 'Content-Type': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Access-Control-Allow-Origin': '*',
                        // 'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0'
                    }
                },
                LiquidfilChart: null,
                tree_test: null,
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
                    .catch(err => {
                        console.error(err.stack);
                    })
            },
            /*3. 展示水纹球图*/
            showLiquidfil(){
                ApiUtil.filtrationFunc(()=>{
                    this.drawLiquidfilChart()
                },3000);
            },
            drawLiquidfilChart(){
                this.LiquidfilChart = this.$echarts.init(document.getElementById('echartsLiquidfill'));
                let option = {
                    series: [{
                        type: 'liquidFill',
                        data: [0.6, {
                            value: 0.5,
                            direction: 'left',
                            itemStyle: {
                                normal: {
                                    color: 'red'
                                }
                            }
                        }, 0.4, 0.3]
                    }]
                };
                this.LiquidfilChart.setOption(option,false);
            },
            array2tree_test(){
                let array1 = [
                    {name: '动物',id: 1},
                    {parentID:1,name: '爬行动物',id: '1-1'},
                    {parentID:1,name: '哺乳动物',id: '1-2'},
                    {parentID:1,name: '软体动物',id: '1-3'},
                    {parentID:1,name: '两栖动物',id: '1-4'},
                    {name: '植物',id: 2},
                    {parentID:2,name: '多肉植物',id: '2-1'},
                    {parentID:2,name: '吸氧植物',id: '2-2'},
                    {parentID:2,name: '耐寒植物',id: '2-3'},
                    {parentID:2,name: '沙漠植物',id: '2-4'},
                    {parentID:2,name: '固沙植物',id: '2-5'},
                    {parentID:2,name: '远古植物',id: '2-6'},
                ];
                let tree1 = null;
                // debugger
                tree1 = ApiUtil.arr2tree(array1,'id','parentID',false);
                console.log("tree1 =",tree1);
                this.tree_test = tree1;
            },
            tree2array_test(){
                let array_2 = ApiUtil.tree2arr(this.tree_test,'children');
                console.log("array_2 =",array_2);
            },
            getCascadeFromTree(){
                const tree = [
                    {
                        id: 1,
                        name: '动物',
                        children: [
                            {parentID:1,name: '爬行动物',id: '1-1'},
                            {parentID:1,name: '哺乳动物',id: '1-2'},
                            {parentID:1,name: '软体动物',id: '1-3'},
                            {parentID:1,name: '两栖动物',id: '1-4'},
                        ]
                    },
                    {
                        id: 2,
                        name: '植物',
                        children: [
                            {parentID:2,name: '多肉植物',id: '2-1'},
                            {parentID:2,name: '吸氧植物',id: '2-2'},
                            {parentID:2,name: '耐寒植物',id: '2-3'},
                            {parentID:2,name: '沙漠植物',id: '2-4'},
                            {parentID:2,name: '固沙植物',id: '2-5'},
                            {parentID:2,name: '远古植物',id: '2-6'},
                        ]
                    }
                ];
                let test_obj = {
                    tree: tree,
                    cascadeRelative: 'children',
                    markName: 'id',
                    foundMark: '2-2'
                };
                let array_3 = ApiUtil.getCascadeMarksFromTree(test_obj,true);
                console.log("array_3 =",array_3);
            },
            /*使用jsonp方式进行访问数据*/
            getEarth(){
                let api2="https://apis.map.qq.com/ws/distance/v1/?mode=driving&from=38,115&to=34.75029,113.612248;34.75029,113.612248&key=IIDBZ-CQYWK-NJZJB-AVVRY-YXZ33-55B4Qss";
                let api3="https://sug.so.360.cn/suggest?word=c";
                let api="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
                Fetchjsonp(api3).then((res)=>{
                    return res.json();
                }).then((res)=>{
                    console.log(res);
                });

            },
            regist(){
                this.$axios.post('/api/users/register',{
                    userName: '小明',
                    passWord: 'jslkdjflsd.com',
                    city: 'jsldkjfksd'
                })
                    .then(res => {
                        this.$alert(`${res.data.msg}`);
                        console.log("res =", res);
                    })
                    .catch(err => {
                        console.log("err =", err);
                    })
            }
        },
        created() {
            console.log("进入HomeDoor首页");
        },
        mounted(){

        },
        beforeDestroy() {

        },
        destroyed() {

        }
    }
</script>

<style scoped>
    .echartsLiquidfill_class{
        min-height: 400px;
        width: 100%;
        background-color: #aaeeaa;
    }
</style>