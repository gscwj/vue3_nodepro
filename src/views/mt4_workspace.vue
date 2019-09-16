<template>
    <div id="mt4_wp">
        <div class="control_nav">
            <button @click="showCode">生成javascript代码</button>
            <button @click="runCode">执行javascript代码</button>
            <button @click="exportBlock">导出xml</button>
            <button @click="importBlock(this.workspace,'text_area')">导入xml块到workspace</button>
            <button @click="saveBlockWorkplace">保存workspace</button>
            <button @click="clearLocalWorkspace">清空本地工作区</button>
            <button @click="importBlockspace">加载工作区</button>
            <button id="del_workspace" @click="deleteItem">删除当前选中项</button>
            <button @click="showWorkspaceList">工作区存储列表</button>
        </div>
        <div style="position: absolute;top:2.1em;width: 80%!important;">
            <div id="blocklyArea" class="block_area">
                <!--<div id="blocklyDiv" style="height:100%;width: 100%;border: 1px solid indianred"></div>-->
                <div id="blocklyDiv"></div>
            </div>
            <div class="code_area">
                <textarea id="text_area" class="code_textarea"></textarea>
            </div>
        </div>
        <div id="workspace_save_list" class="workspace_list">
            <ol class="list_ul"></ol>
        </div>
        <div id="toolbox" style="display: none">
            <category name="Variables" custom="VARIABLE"></category>
            <category name="Functions" custom="PROCEDURE"></category>
            <category name="Colours" custom="COLOUR_PALETTE"></category>
            <sep gap="8"></sep>
            <category name="custom">
                <block type="string_length">
                    <value name="VALUE">
                        <shadow type="text">
                            <field name="TEXT">爱家卡圣诞节</field>
                        </shadow>
                    </value>
                </block>
                <block type="json_string_len"></block>
                <block type="listitems"></block>
                <block type="pingfang"></block>
            </category>
            <category name="MT4通用">
                <block type="ea_file"></block>
                <block type="mt4_header"></block>
                <block type="OnInit"></block>
                <block type="create_variable"></block>
                <block type="return_fn"></block>
                <block type="math_number"></block>
                <block type="text"></block>
                <block type="cprint"></block>
                <block type="Goprint"></block>
            </category>
            <category name="typical">
                <block type="controls_if"></block>
                <block type="math_number"></block>
                <block type="text"></block>
                <block type="text_print"></block>
            </category>
            <category name="Math" colour="%{BKY_MATH_HUE}">
                <block type="math_number">
                    <field name="NUM">123</field>
                </block>
                <block type="math_arithmetic"></block>
                <block type="math_single"></block>
            </category>
            <category name="Logic" colour="%{BKY_LOGIC_HUE}">
                <block type="controls_if"></block>
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_boolean"></block>
            </category>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mt4_workspace",
        data() {
            return {
                workspace: null

            }
        },
        mounted() {
            let myapplication = {
                getPalette: ()=>{
                    return ['#4286f4', '#ef0447'];
                }
            };
            var blocklyArea = document.getElementById('blocklyArea');
            var blocklyDiv = document.getElementById('blocklyDiv');
            let toolbox_option = {
                toolbox: document.getElementById('toolbox'),
                media: "/static/lib/media/",
            };
            this.workspace = Blockly.inject(blocklyDiv, toolbox_option);
            let onresize =  (e)=> {
                // Compute the absolute coordinates and dimensions of blocklyArea.
                var element = blocklyArea;
                var x = 0;
                var y = 0;
                do {
                    x += element.offsetLeft;
                    y += element.offsetTop;
                    element = element.offsetParent;
                    console.log("x: ", x, " y: ", y);
                } while (element);
                // Position blocklyDiv over blocklyArea.
                blocklyDiv.style.left = x + 'px';
                blocklyDiv.style.top = y + 'px';
                blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
                blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
                Blockly.svgResize(this.workspace);
            };
            window.addEventListener('resize', onresize, false);
            onresize();
            Blockly.svgResize(this.workspace);

            /**
             * Construct the blocks required by the flyout for the colours category.
             * @param {!Blockly.Workspace} workspace The workspace this flyout is for.
             * @return {!Array.<!Element>} Array of XML block elements.
             */
            myapplication.coloursFlyoutCallback =  (workspace) =>{
                // Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
                var colourList = myapplication.getPalette();
                var xmlList = [];
                if (Blockly.Blocks['colour_picker']) {
                    for (var i = 0; i < colourList.length; i++) {
                        var blockText = '<block type="colour_picker">' +
                            '<field name="COLOUR">' + colourList[i] + '</field>' +
                            '</block>';
                        var block = Blockly.Xml.textToDom(blockText);
                        xmlList.push(block);
                    }
                }
                return xmlList;
            };
            this.workspace.registerToolboxCategoryCallback(
                'COLOUR_PALETTE', myapplication.coloursFlyoutCallback);
        },
        methods: {
            showCode() {
                // Generate JavaScript code and display it.
                Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
                let code = Blockly.JavaScript.workspaceToCode(this.workspace);
                alert(code);
                document.getElementById('text_area').value = code;
            },
            runCode() {
                // Generate JavwaScript code and run it.
                window.LoopTrap = 1000;
                Blockly.JavaScript.INFINITE_LOOP_TRAP =
                    'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
                var code = Blockly.JavaScript.workspaceToCode(this.workspace);
                Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
                try {
                    eval(code);
                } catch (e) {
                    alert(e);
                }
            },
            exportBlock() {
                let xml = Blockly.Xml.workspaceToDom(this.workspace);
                let xml_text = Blockly.Xml.domToText(xml);
                console.log("exportBlock - xml_text =", xml_text);
                let xml_pretty_text = Blockly.Xml.domToPrettyText(xml);
                document.getElementById('text_area').value = xml_text;
            },
            importBlock(work_area, xml_dom_name) {
                console.log("work_area =", work_area);
                console.log("xml_dom_name =", xml_dom_name);
                let xml_text = document.getElementById(xml_dom_name).value;
                console.log("xml_text =", xml_text);
                let xml = Blockly.Xml.textToDom(xml_text);
                Blockly.Xml.domToWorkspace(xml, work_area);
            },
            saveBlockWorkplace() {
                let prompt_title = "要保存的工作区名称：";
                let blockly_work_name_default = "default_workspace";
                let blockly_work_name = "";
                blockly_work_name = window.prompt(prompt_title, blockly_work_name_default);
                if ((blockly_work_name && blockly_work_name.length <= 0)) {
                    alert("输入不能为空");
                    return -2;
                } else if (!blockly_work_name) {
                    return -1;
                }
                alert("所输入的名称为：" + blockly_work_name);
                /*导出workspace的xml内容*/
                let xml = Blockly.Xml.workspaceToDom(this.workspace);
                let xml_text = Blockly.Xml.domToText(xml);
                console.log("exportBlock - xml_text =", xml_text);
                let xml_pretty_text = Blockly.Xml.domToPrettyText(xml);
                this.save_local_storage(blockly_work_name, xml_pretty_text);
            },
            save_local_storage(name, value) {
                if (!localStorage.hasOwnProperty('qomahui_mt4_blockly')) {
                    let obj = {};
                    localStorage.setItem('qomahui_mt4_blockly', JSON.stringify(obj))
                }
                let qomahui_mt4_blockly_strvalue = localStorage.getItem('qomahui_mt4_blockly');
                console.log("qomahui_mt4_blockly_strvalue =", qomahui_mt4_blockly_strvalue);
                alert("下一步1");
                let qomahui_mt4_blockly_objvalue = JSON.parse(qomahui_mt4_blockly_strvalue);
                console.log("存储之前：" + JSON.stringify(qomahui_mt4_blockly_objvalue));
                alert("下一步2");
                let obj_keys = Object.keys(qomahui_mt4_blockly_objvalue);
                console.info("obj_keys =", obj_keys);
                if (obj_keys.indexOf(name) >= 0) {
                    alert("工作区：" + name + "已存在");
                    return -1;
                }
                qomahui_mt4_blockly_objvalue[name] = value;
                console.info("存储之后：", qomahui_mt4_blockly_objvalue);
                localStorage.setItem('qomahui_mt4_blockly', JSON.stringify(qomahui_mt4_blockly_objvalue));
                alert("工作区：" + name + "\n存储完成！");
            },
            clearLocalWorkspace() {
                localStorage.removeItem('qomahui_mt4_blockly');
                if (!localStorage.hasOwnProperty('qomahui_mt4_blockly')) {
                    alert("已清空本地工作区");
                }
            },
            /*显示工作区列表*/
            showWorkspaceList() {
                let dom_WorkspaceList = $('#workspace_save_list');
                console.log("dom_WorkspaceList =",dom_WorkspaceList);
                let old_display = dom_WorkspaceList.css('display');
                console.log("原来状态：", old_display);
                if (old_display !== 'none') {
                    dom_WorkspaceList.css('display', '');
                    $("ol.list_ul").empty();
                } else {
                    let qomahui_mt4_blockly_storage = null;
                    if (localStorage.hasOwnProperty('qomahui_mt4_blockly')) {
                        qomahui_mt4_blockly_storage = localStorage.getItem('qomahui_mt4_blockly');
                    } else {
                        alert('还未保存工作区！');
                        return -2;
                    }
                    let qomahui_mt4_blockly_objs = JSON.parse(qomahui_mt4_blockly_storage);
                    let keys = Object.keys(qomahui_mt4_blockly_objs);
                    keys.forEach((item) => {
                        let li_obj = $("<li></li>").text(item);
                        $("ol.list_ul").append(li_obj);
                    });
                    dom_WorkspaceList.css('display', 'block');
                }
                //获取每一个li节点并设置点击事件
                $("ol.list_ul li").click(function(e){
                    //当点击某一个节点的时候，增加类名为hover
                    console.log("jflskdjflksdjf");
                    // $(this).addClass("selected").siblings().removeClass("selected");
                    $(this).addClass("selected");
                });
            },
            /*导入工作区*/
            importBlockspace() {
                let is_load_item = $("li.selected");
                let is_load_item_text = is_load_item.text();
                console.log("is_load_item_text =", is_load_item_text);
                let ret_value = confirm("加载选中项：" + is_load_item_text);
                if (ret_value === true) {
                    let qomahui_mt4_blockly_storage = null;
                    if (localStorage.hasOwnProperty('qomahui_mt4_blockly')) {
                        qomahui_mt4_blockly_storage = localStorage.getItem('qomahui_mt4_blockly');
                    } else {
                        alert('本地工作区无项目！');
                        return -2;
                    }
                    let qomahui_mt4_blockly_objs = JSON.parse(qomahui_mt4_blockly_storage);
                    console.log("qomahui_mt4_blockly_objs =", qomahui_mt4_blockly_objs);
                    let keys = Object.keys(qomahui_mt4_blockly_objs);
                    console.log("keys =", keys);
                    for (let i = 0; i < keys.length; i++) {
                        if (is_load_item_text === keys[i]) {
                            let xml = Blockly.Xml.textToDom(qomahui_mt4_blockly_objs[is_load_item_text]);
                            console.log("xml =", xml);
                            Blockly.Xml.domToWorkspace(xml, this.workspace);
                            break;
                        }
                    }
                } else {
                    return -1;
                }
            },
            /*从本地工作区删除*/
            deleteItem() {
                let is_del_item = $("li.selected");
                let ret_value = confirm("删除选中项：" + is_del_item.text());
                if (ret_value === true) {
                    is_del_item.remove();
                    let qomahui_mt4_blockly_storage = null;
                    if (localStorage.hasOwnProperty('qomahui_mt4_blockly')) {
                        qomahui_mt4_blockly_storage = localStorage.getItem('qomahui_mt4_blockly');
                    } else {
                        alert('本地工作区无项目！');
                        return -2;
                    }
                    let qomahui_mt4_blockly_objs = JSON.parse(qomahui_mt4_blockly_storage);
                    console.log("qomahui_mt4_blockly_objs =", qomahui_mt4_blockly_objs);
                    let keys = Object.keys(qomahui_mt4_blockly_objs);
                    for (let i = 0; i < keys.length; i++) {
                        if (is_del_item.text() === keys[i]) {
                            delete qomahui_mt4_blockly_objs[keys[i]];
                            break;
                        }
                    }
                    localStorage.setItem('qomahui_mt4_blockly', JSON.stringify(qomahui_mt4_blockly_objs));
                } else {
                    return -1;
                }
            },
        }
    }
   /* $(function () {
        alert('引入成功')
    })*/
</script>

<style scoped>
    #mt4_wp{
        width: 100%!important;
        height: 800px!important;
        position: relative;
        float: left;
    }
    .block_area {
        min-height: 25em;
        min-width: 20em;
        background-color: aquamarine;
        /*position: absolute;*/
    }
    .code_area{
        padding: 0 10px;
        height: 100%;
        min-width: 10em;
        min-height: 25em;
        background-color: beige;
    }
    .code_textarea{
        padding: 0;
        width: 100%;
        min-height: 15em;
        box-sizing: border-box;
        border: #f4516c solid 1px;
    }
    .control_nav{
        position: -webkit-sticky;
        position: sticky;
        display: flex;
        flex-direction: row-reverse;
        top: 0;
        background-color: #aaeeaa;
        height: 2em;
    }
    .workspace_list{
        display: none;
        position: absolute;
        right: 10px;
        top: 40px;bottom: 30px;
        background-color: #cccccc;
        width: 10em;
        line-height: 15px;
    }
    .list_ul{
        text-align: left;
        align-items: flex-start;
        font-size: 15px;
        font-family: "Adobe 楷体 Std R" ,sans-serif;
        color: #808080;
        overflow: auto;
        height: 100%;
        margin: 5px 10px 0 10px;
        display: flex;
        flex-direction: column;
    }
    .selected{
        color: #007bff;
    }
</style>
<style>
    #mt4_wp .list_ul li{
        margin-left: -15px;
        cursor: pointer;
    }
    #mt4_wp .list_ul li:hover{
        color: #007bff;
    }
</style>