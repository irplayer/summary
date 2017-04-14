"use strict";
const vscode = require('vscode'),
    beautify = require('js-beautify'),
    php = require('./php'),
    path = require('path'),
    fs = require('fs');
const dumpError = e => {
    if (e) console.log('beautify err:', e);
    return [];
};
const dropComments = inText => inText.replace(/(\/\*.*\*\/)|\/\/.*(?:[\r\n]|$)/g, "");
const mergeOpts = function(opts, kind) {
    const finOpts = {};
    for (let a in opts) {
        if (a !== 'js' && a !== 'html' && a !== 'css') {
            finOpts[a] = opts[a];
        }
    }
    //merge in the per type settings
    if (kind in opts) {
        for (let b in opts[kind]) {
            if (b === 'allowed_file_extensions') continue;
            finOpts[b] = opts[kind][b];
        }
    }
    return finOpts;
};
const extMatch = n => ({
    pattern: n.startsWith("**/") ? n : ("**/" + n)
});
const getFileType = function(doc, dontAsk) {
    if (doc.languageId === 'javascript') return 'js';
    if (doc.languageId === 'json') return 'js';
    if (doc.languageId === 'php') return 'php';
    if (doc.languageId === 'css') return 'css';
    if (doc.languageId === 'html') return 'html';
    const type = doc.isUntitled ? "" : path.extname(doc.fileName).toLowerCase();
    const jsSchema = vscode.workspace.getConfiguration('json').schemas;
    if (jsSchema.length) {
        let matcher = [];
        jsSchema.forEach(schema => {
            if (typeof schema.fileMatch === 'string') matcher.push(extMatch(schema.fileMatch));
            else matcher = matcher.concat(schema.fileMatch.map(extMatch));
        });
        if (vscode.languages.match(matcher, doc)) return "js";
    }
    const cfg = vscode.workspace.getConfiguration('formatter');
    if (cfg.JSfiles.indexOf(type) >= 0 || (type[0] === '.' && cfg.JSfiles.indexOf(type.slice(1)) >= 0)) return 'js';
    if (dontAsk) return;
    return new Promise((resolve, reject) => {
        //Ask what they want to do:
        return vscode.window.showQuickPick([{
            label: "JS",
            description: "Does JavaScript and JSON"
        }, {
            label: "PHP"
        }, {
            label: "CSS"
        }, {
            label: "HTML"
        }], {
            matchOnDescription: true,
            placeHolder: "Couldn't determine type to beautify, please choose."
        }).then(function(choice) {
            if (!choice || !choice.label) return reject('no beautify type selected');
            return resolve(choice.label.toLowerCase());
        }, () => 0);
    });
};

function getConfigFor(doc, defaultOptions, type) {
    function findRecursive(dir, fileName) {
        const fullPath = path.join(dir, fileName);
        const nextDir = path.dirname(dir);
        let result = fs.existsSync(fullPath) ? fullPath : null;
        if (!result && (nextDir !== dir)) {
            result = findRecursive(nextDir, fileName);
        }
        return result;
    }
    let base = vscode.workspace.rootPath;
    if (!doc.isUntitled) base = path.dirname(doc.fileName);
    if (!base) return Promise.resolve(defaultOptions);
    let configFile = findRecursive(base, '.jsbeautifyrc');
    if (!configFile) return Promise.resolve(defaultOptions);
    return new Promise(resolve => {
        fs.readFile(configFile, 'utf8', (e, d) => {
            let opts = defaultOptions;
            if (!d) return resolve(opts);
            try {
                const unCommented = dropComments(d.toString());
                opts = JSON.parse(unCommented);
                opts = mergeOpts(opts, type);
            } catch (e) {
                vscode.window.showWarningMessage(`Found a .jsbeautifyrc file [${configFile}], but it did not parse correctly.`);
            }
            resolve(opts);
        });
    });
}

function optionsFromFormat(formattingOptions) {
    return {
        indent_with_tabs: !formattingOptions.insertSpaces,
        indent_size: formattingOptions.tabSize,
        indent_char: ' ',
        "preserve_newlines": false
    };
}

function rangeEditByType(type) {
    function extendRange(doc, rng) {
        const r = new vscode.Range(new vscode.Position(rng.start.line, 0), rng.end.translate(0, Number.MAX_VALUE));
        return doc.validateRange(r);
    }
    return (doc, rng, formattingOptions) => {
        rng = extendRange(doc, rng);
        return beautifyDoc(doc, rng, optionsFromFormat(formattingOptions), type).then(newText => [vscode.TextEdit.replace(rng, newText)], dumpError);
    };
}

function beautifyDoc(doc, range, defaultOptions, type) {
    if (!doc) {
        vscode.window.showInformationMessage("不支持格式化此文档！");
        throw "";
    }
    return Promise.resolve(type ? type : getFileType(doc)).then(type => getConfigFor(doc, defaultOptions, type).then(config => {
        const original = doc.getText(doc.validateRange(range));
        if (type == "php") {
            // vscode.window.showInformationMessage(`Format Code ${type}`);
            return php(original);
        }
        return beautify[type](original, config);
    }));
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('cfs.formatter', () => {
        const active = vscode.window.activeTextEditor;
        if (!active) return;
        if (!active.document) return;
        let range = new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
        range = active.document.validateRange(range);
        return beautifyDoc(active.document, range, optionsFromFormat(active.options)).then(newText => active.edit(editor => editor.replace(range, newText)), dumpError);
    }));
    let assoc = {
        "javascript": "js",
        "json": "js",
        "php": "php"
    };
    for (let name in assoc) {
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(name, {
            provideDocumentRangeFormattingEdits: rangeEditByType(assoc[name])
        }));
    }
}
exports.activate = activate;