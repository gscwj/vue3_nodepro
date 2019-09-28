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
        <div class="tree_kuang">
            <div class="tree_chart_class" id="tree_chart">

            </div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                custom-class="dia_class"
                :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
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
                gridData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                dialogVisible: false,
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
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
            showLiquidfil() {
                ApiUtil.filtrationFunc(() => {
                    this.drawLiquidfilChart()
                    this.draw_tree_chart();
                }, 1500);
            },
            drawLiquidfilChart() {
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
                this.LiquidfilChart.setOption(option, false);
            },
            array2tree_test() {
                let array1 = [
                    {name: '动物', id: 1},
                    {parentID: 1, name: '爬行动物', id: '1-1'},
                    {parentID: 1, name: '哺乳动物', id: '1-2'},
                    {parentID: 1, name: '软体动物', id: '1-3'},
                    {parentID: 1, name: '两栖动物', id: '1-4'},
                    {name: '植物', id: 2},
                    {parentID: 2, name: '多肉植物', id: '2-1'},
                    {parentID: 2, name: '吸氧植物', id: '2-2'},
                    {parentID: 2, name: '耐寒植物', id: '2-3'},
                    {parentID: 2, name: '沙漠植物', id: '2-4'},
                    {parentID: 2, name: '固沙植物', id: '2-5'},
                    {parentID: 2, name: '远古植物', id: '2-6'},
                ];
                let tree1 = null;
                // debugger
                tree1 = ApiUtil.arr2tree(array1, 'id', 'parentID', false);
                console.log("tree1 =", tree1);
                this.tree_test = tree1;
            },
            tree2array_test() {
                let array_2 = ApiUtil.tree2arr(this.tree_test, 'children');
                console.log("array_2 =", array_2);
            },
            getCascadeFromTree() {
                const tree = [
                    {
                        id: 1,
                        name: '动物',
                        children: [
                            {parentID: 1, name: '爬行动物', id: '1-1'},
                            {parentID: 1, name: '哺乳动物', id: '1-2'},
                            {parentID: 1, name: '软体动物', id: '1-3'},
                            {parentID: 1, name: '两栖动物', id: '1-4'},
                        ]
                    },
                    {
                        id: 2,
                        name: '植物',
                        children: [
                            {parentID: 2, name: '多肉植物', id: '2-1'},
                            {parentID: 2, name: '吸氧植物', id: '2-2'},
                            {parentID: 2, name: '耐寒植物', id: '2-3'},
                            {parentID: 2, name: '沙漠植物', id: '2-4'},
                            {parentID: 2, name: '固沙植物', id: '2-5'},
                            {parentID: 2, name: '远古植物', id: '2-6'},
                        ]
                    }
                ];
                let test_obj = {
                    tree: tree,
                    cascadeRelative: 'children',
                    markName: 'id',
                    foundMark: '2-2'
                };
                let array_3 = ApiUtil.getCascadeMarksFromTree(test_obj, true);
                console.log("array_3 =", array_3);
            },
            /*使用jsonp方式进行访问数据*/
            getEarth() {
                let api2 = "https://apis.map.qq.com/ws/distance/v1/?mode=driving&from=38,115&to=34.75029,113.612248;34.75029,113.612248&key=IIDBZ-CQYWK-NJZJB-AVVRY-YXZ33-55B4Qss";
                let api3 = "https://sug.so.360.cn/suggest?word=c";
                let api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
                Fetchjsonp(api3).then((res) => {
                    return res.json();
                }).then((res) => {
                    console.log(res);
                });

            },
            regist() {
                this.$axios.post('/api/users/register', {
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
            },
            generate_tree_chart_data() {
                let max_limit = 3;
                let data = {
                    name: "小米科技有限公司",
                    children: [
                        {
                            name: '公司股东',
                            count: 5,
                            children: []
                        },
                        {
                            name: '年报',
                            count: 3,
                            children: []
                        },
                        {
                            name: '处罚信息',
                            count: 5,
                            children: []
                        },
                        {
                            name: '公司高管',
                            count: 2,
                            children: []
                        },
                        {
                            name: '公司变更',
                            count: 4,
                            children: []
                        },
                        {
                            name: '其他',
                            count: 3,
                            children: []
                        },
                    ]
                };
                data.children.forEach((item) => {
                    console.log("item =", item);
                    let content_pre = item.name + '_';
                    for (let i = 0; i < item.count; i++) {
                        if (i + 1 > 3) {
                            item.children.push({
                                name: '其它项...'
                            });
                            break;
                        }
                        item.children.push({
                            name: content_pre + (i + 1).toString(),
                        });
                    }
                });
                return data;
            },
            draw_tree_chart() {
                let tree_chart_cav = this.$echarts.init(document.getElementById('tree_chart'));
                /*let data = {
                    "name": "余杭区: 50675",
                    "children": [
                        {
                            "id": 102,
                            "name": "高端制造:4631",
                            type: "lll",
                            "children": [
                                {
                                    "id": 10203,
                                    "name": "其他:2402"
                                }, {
                                    "id": 10202,
                                    "name": "货摊纺织、服装及鞋零售:351"
                                }, {
                                    "id": 10201,
                                    "name": "技能培训、教育辅助及其他教育:1878"
                                }]
                        },
                        {
                            "id": 106,
                            "name": "金融服务:1559",
                            "children": [{
                                "id": 10603,
                                "name": "其他:19"
                            }, {
                                "id": 10602,
                                "name": "控股公司服务:27"
                            }, {
                                "id": 10601,
                                "name": "投资与资产管理:1513"
                            }]
                        },
                        {
                            "id": 107,
                            "name": "生物健康:1435",
                            "children": [{
                                "id": 10703,
                                "name": "其他:745"
                            }, {
                                "id": 10701,
                                "name": "医学研究和试验发展:353"
                            }, {
                                "id": 10702,
                                "name": "生物技术推广服务:337"
                            }]
                        },
                        {
                            "id": 103,
                            "name": "时尚行业:5057",
                            "children": [{
                                "id": 10302,
                                "name": "服装零售:1758"
                            }, {
                                "id": 10301,
                                "name": "服装批发:2805"
                            }, {
                                "id": 10303,
                                "name": "其他:494"
                            }]
                        },
                        {
                            "id": 104,
                            "name": "旅游休闲:953",
                            "children": [{
                                "id": 10403,
                                "name": "其他:560"
                            }, {
                                "id": 10402,
                                "name": "其他食品零售:172"
                            }, {
                                "id": 10401,
                                "name": "其他未列明餐饮业:221"
                            }]
                        },
                        {
                            "id": 105,
                            "name": "文化创意:4131",
                            "children": [{
                                "id": 10503,
                                "name": "其他:1448"
                            }, {
                                "id": 10502,
                                "name": "其他技术推广服务:1174"
                            }, {
                                "id": 10501,
                                "name": "其他体育:1509"
                            }]
                        },
                        {
                            "id": 101,
                            "name": "数字经济:32909",
                            "children": [{
                                "id": 10101,
                                "name": "其他科技推广和应用服务业:18181"
                            }, {
                                "id": 10102,
                                "name": "其他未列明信息技术服务业:8817"
                            }, {
                                "id": 10103,
                                "name": "其他:5911"
                            }]
                        }
                    ]
                };*/
                let data = this.generate_tree_chart_data();
                let option = {
                    series: [
                        {
                            type: 'tree',
                            name: 'tree_node',
                            // layout: 'radial',
                            roam: 'move',
                            data: [data],
                            top: '10%',
                            bottom: '10%',
                            right: '25%',
                            left: '7%',
                            symbolSize: 8,
                            symbol: 'circle',
                            // 展开发的层级数
                            initialTreeDepth: 3,
                            itemStyle: {
                                color: '#9D85FB',
                                borderColor: '#9D85FB',
                            },
                            label: {
                                normal: {
                                    position: 'bottom',
                                    verticalAlign: 'middle',
                                    align: 'center',
                                },
                            },
                            // 线的样式
                            lineStyle: {
                                color: '#9D85FB',
                                curveness: '0.5',
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        // 叶子节点字的样式
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left',
                                    },
                                },
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750,
                        }
                    ],
                };
                tree_chart_cav.setOption(option, false);
                tree_chart_cav.on('click', {seriesIndex: 0}, (event_obj) => {
                    console.log("event_obj =", event_obj);
                    var container = document.getElementById('tree_chart');
                    var allNode = 0;
                    var nodes = tree_chart_cav._chartsViews[0]._data._graphicEls;
                    for (var i = 0, count = nodes.length; i < count; i++) {
                        var node = nodes[i];
                        if (node === undefined)
                            continue;
                        allNode++;
                    }
                    var height = 600;
                    var currentHeight = 45 * allNode;
                    var newWidth = Math.max(currentHeight, height);
                    container.style.width = window.innerWidth + 'px';
                    container.style.height = newWidth + 'px';
                    tree_chart_cav.resize();
                    console.log("event_obj.name =", event_obj.name);
                    if (event_obj.name === '其它项...') {
                        this.dialogVisible = true;
                    }
                    // series index 1 的系列中的 name 为 'xx' 的元素被 'mouseover' 时，此方法被回调。
                });
            }
        },
        created() {
            console.log("进入HomeDoor首页");
        },
        mounted() {

        },
        beforeDestroy() {

        },
        destroyed() {

        }
    }
</script>

<style scoped>
    .echartsLiquidfill_class {
        min-height: 400px;
        width: 100%;
        background-color: #aaeeaa;
    }

    .tree_kuang {
        height: 600px;
        width: 100%;
        overflow: auto;
    }

    .tree_chart_class {
        height: 100%;
        width: 100%;
        background-color: aquamarine;
    }
</style>
<style>
    .dia_class{
        min-height: 200px;
    }
</style>