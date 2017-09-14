"use strict";
module.exports = formatCode;
var leval = 0,
    string = false;

function formatCode(code) {
    // 设置缩进并去除尾随空格
    code = separatCode(code, /\r?\n/, indentSnippets, "\n");
    // 函数/类前添加空行
    code = code.replace(/([^\{])\n+( *(public |private )?(function |class ))/g, '$1\n\n$2');
    // 仅保留一个空行
    code = code.replace(/(\n{2,})/g, '\n\n');
    code = separatCode(code, '"', formatSnippets);
    return code;
}

function separatCode(code, separator, callback, joiner) {
    var codes = code.split(separator);
    for (let i in codes) {
        codes[i] = callback(codes[i], i);
    }
    return codes.join(joiner || separator);
}

function indentSnippets(code) {
    if (!string) {
        // trim
        code = code.replace(/(^\s*)|(\s*$)/g, "");
        // indent
        if ("})]".indexOf(code.charAt(0)) >= 0) leval--;
        if (code) {
            for (let i = 0; i < leval * 4; i++) {
                code = " " + code;
            }
        }
        if ("{([".indexOf(code.charAt(code.length - 1)) >= 0) leval++;
    }
    let quotes = (code.match(/"/g) || []).length;
    if (quotes > 0 && quotes % 2 === 1) string = !string;
    return code;
}

function formatSnippets(code, index) {
    if (index % 2 === 0) {
        code = setSpace(code);
    }
    return code;
}

function setSpace(code) {
    // `=` [>1]
    code = code.replace(/ ?([\+\-\*\/\.\?!><]?={1,3})(?!\>) ?/g, ' $1 ');
    // `$$` `||` [>1]
    code = code.replace(/ ?([\&\|]{2}) ?/g, ' $1 ');
    // `,` [0, >1]
    code = code.replace(/ *(,) ?(?!\n)/g, '$1 ');
    // before `{` [1]
    code = code.replace(/\n* *(\{)/g, ' $1');
    // before `)` [1]
    code = code.replace(/ *(\))/g, ' $1');
    // after `(` [1]
    code = code.replace(/(\() */g, '$1 ');
    // blank `()` `[]`
    code = code.replace(/\(\s*\)/g, '()');
    // after `if` `for` and `each`
    code = code.replace(/(if|for|each)\s*\(/g, '$1 (');
    // blank `else`
    code = code.replace(/\}\s*else\s*\{/g, '} else {');
    return code;
}