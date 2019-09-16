/*1、变量声明并初始化 块*/
Blockly.Blocks['create_variable'] = {
    init: function () {
        this.jsonInit({
            "type": "create_variable",
            "message0": "新变量 %1 %2  =  %3 %4 变量属性 %5",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "variable_type",
                    "options": [
                        [
                            "int",
                            "int"
                        ],
                        [
                            "long",
                            "long"
                        ],
                        [
                            "char",
                            "char"
                        ],
                        [
                            "float",
                            "float"
                        ],
                        [
                            "double",
                            "double"
                        ],
                        [
                            "bool",
                            "bool"
                        ],
                        [
                            "String",
                            "String"
                        ],
                        [
                            "datetime",
                            "datetime"
                        ]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "variable_name",
                    "text": "变量1"
                },
                {
                    "type": "field_input",
                    "name": "variable_value",
                    "text": "我是变量1的值"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_dropdown",
                    "name": "variable_attr",
                    "options": [
                        [
                            "null",
                            ""
                        ],
                        [
                            "extern",
                            "extern"
                        ],
                        [
                            "input",
                            "input"
                        ],
                        [
                            "static",
                            "static"
                        ]
                    ]
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['create_variable'] = function(block) {
    let dropdown_variable_type = block.getFieldValue('variable_type');
    let text_variable_name = block.getFieldValue('variable_name');
    let text_variable_value = block.getFieldValue('variable_value');
    let dropdown_variable_attr = block.getFieldValue('variable_attr');
    // TODO: Assemble JavaScript into code variable.
    let code = dropdown_variable_attr+' '+
        dropdown_variable_type+' '+
        text_variable_name+ ' = '+
        text_variable_value+';\n';
    return code;
};
/*2、程序文件虚框*/
Blockly.Blocks['ea_file'] = {
    init: function () {
        this.jsonInit({
            "type": "ea_file",
            "message0": "程序文件 %1",
            "args0": [
                {
                    "type": "input_statement",
                    "name": "program_body",
                    "align": "RIGHT"
                }
            ],
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['ea_file'] = function(block) {
    let statements_program_body = Blockly.JavaScript.statementToCode(block, 'program_body');
    // TODO: Assemble JavaScript into code variable.
    // let code = statements_program_body;
    return statements_program_body;
};
/*3、return 块*/
Blockly.Blocks['return_fn'] = {
    init: function () {
        this.jsonInit({
            "type": "return_fn",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_label_serializable",
                    "name": "return_btn",
                    "text": "return "
                },
                {
                    "type": "input_value",
                    "name": "return_value"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['return_fn'] = function(block) {
    var value_return_value = Blockly.JavaScript.valueToCode(block, 'return_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'return ('+value_return_value+');\n';
    return code;
};
/*4、字符串*/

Blockly.Blocks['Goprint'] = {
    init: function () {
        this.jsonInit({
            "type": "Goprint",
            "message0": "%1",
            "args0": [{
                "type": "field_input",
                "name": "TEXT",
                "text": ""
            }],
            "output": "String",
            "style": "text_blocks",
            "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
            "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
            "extensions": [
                "text_quotes",
                "parent_tooltip_when_inline"
            ]
        })
    }
};
function go_quote_(a){
    a=a.replace(/\\/g,"\\\\")
        .replace(/\n/g,"\\\n")
        .replace(/'/g,"\\'");
    return"\""+a+"\"";
}
Blockly.JavaScript['Goprint'] = function(block) {
    // var code = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
    // return [code, Blockly.JavaScript.ORDER_ATOMIC];
    let code = go_quote_(block.getFieldValue('TEXT'));
    console.log("code =",code);
    // TODO: Assemble JavaScript into code variable.
    // let code = '\"'+value_print_value+'\"';
    return [code,Blockly.JavaScript.ORDER_ATOMIC];
};
/*试验数据块*/
Blockly.Blocks['string_length'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('><length of');
        this.setOutput(true, 'Number');
        this.setColour('#F05B12');
        this.setTooltip('Returns number of letters in the provided text.');
        this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
    }
};
Blockly.JavaScript['string_length'] = function(block) {
    //String or array length.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};
/*平方-自定义block*/
Blockly.Blocks['pingfang'] = {
    init: function() {
        this.jsonInit({
            "type": "pingfang",
            "message0": "平方 %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "main1",
                    "check": "Number"
                }
            ],
            "inputsInline": false,
            "output": "Number",
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};
Blockly.JavaScript['pingfang'] = function(block) {
    /*var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
            Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];*/
    let value_main1 = Blockly.JavaScript.valueToCode(block, 'main1', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    // TODO: Assemble JavaScript into code variable.
    return ['math.pow('+value_main1+')',Blockly.JavaScript.ORDER_MEMBER];
};

/*自定义输出模板*/
Blockly.Blocks['cprint'] = {
    init: function() {
        this.jsonInit({
            "type": "cprint",
            "message0": "自定义输出 %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "print_value",
                    "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};
Blockly.JavaScript['cprint'] = function(block) {
    let value_print_value = Blockly.JavaScript.valueToCode(block, 'print_value', Blockly.JavaScript.ORDER_ATOMIC)|| '\'\'';
    // TODO: Assemble JavaScript into code variable.
    let code = 'Print('+value_print_value+');\n';
    return code;
};
/*平方-自定义块的代码生成器*/
Blockly.Blocks['json_string_len'] = {
    init: function() {
        this.jsonInit({
            "message0": 'length of %1',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "String"
                }
            ],
            "output": "Number",
            "colour": 120,
            "tooltip": "Returns number of letters in the provided text.",
            "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
        });
    }
};
Blockly.JavaScript['json_string_len'] = function(block) {
    //String or array length.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'sdf\'';
    return [argument0 + '.toUpperCase()', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks['listitems'] = {
    init: function () {
        this.jsonInit({
            "type": "lists_repeat",
            "message0": "%{BKY_LISTS_REPEAT_TITLE}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "ITEM"
                },
                {
                    "type": "input_value",
                    "name": "NUM",
                    "check": "Number"
                }
            ],
            "output": "Array",
            "colour": "%{BKY_LISTS_HUE}",
            "tooltip": "%{BKY_LISTS_REPEAT_TOOLTIP}",
            "helpUrl": "%{BKY_LISTS_REPEAT_HELPURL}"
        })
    }
};
Blockly.JavaScript['listitems'] = function (block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return [argument0, Blockly.JavaScript.ORDER_MEMBER];
};