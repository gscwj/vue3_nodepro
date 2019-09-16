Blockly.Blocks['mt4_header'] = {
    init: function() {
        this.jsonInit({
            "type": "mt4_header",
            "message0": "#define copyright %1 %2 #define link %3 %4 #define version %5 %6 %7 #define  strict ",
            "args0": [
                {
                    "type": "field_input",
                    "name": "copyright",
                    "text": "Copyright 2017, MetaQuotes Software Corp."
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_input",
                    "name": "link",
                    "text": "https://www.mql5.com"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_input",
                    "name": "version",
                    "text": "1.00"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_checkbox",
                    "name": "is_strict_checkbox",
                    "checked": true
                }
            ],
            "inputsInline": false,
            "nextStatement": null,
            "colour": 150,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};
Blockly.JavaScript['mt4_header'] = function(block) {
    let text_copyright = block.getFieldValue('copyright');
    let text_link = block.getFieldValue('link');
    let text_version = block.getFieldValue('version');
    let checkbox_is_strict_checkbox = block.getFieldValue('is_strict_checkbox') === 'TRUE';
    // TODO: Assemble JavaScript into code variable.
    let code = '#property copyright "'+text_copyright+'"\n';
    code += '#property link "'+text_link+'"\n';
    code += '#property version "'+text_version+'"\n';
    code += checkbox_is_strict_checkbox?'#property strict\n':'\n';
    return code;
};
Blockly.Blocks['OnInit'] = {
    init: function() {
        this.jsonInit(
            {
                "type": "oninit",
                "message0": "加载初始化 %1 %2",
                "args0": [
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "exec_content",
                        "check": "executation"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            }
        );
    }
};
Blockly.JavaScript['OnInit'] = function(block) {
    let statements_exec_content = Blockly.JavaScript.statementToCode(block, 'exec_content');
    // TODO: Assemble JavaScript into code variable.
    let code = 'int OnInit(){\n'+statements_exec_content+'\n}\n';
    return code;
};