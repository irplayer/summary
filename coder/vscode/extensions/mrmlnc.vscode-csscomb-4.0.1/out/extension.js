'use strict';
const path = require("path");
const vscode = require("vscode");
const micromatch = require("micromatch");
const config_1 = require("./services/config");
const comb_1 = require("./services/comb");
let output;

function showOutput(msg) {
    if (!output) {
        output = vscode.window.createOutputChannel('CSSComb');
    }
    output.clear();
    output.appendLine('[CSSComb]\n');
    output.append(msg);
    output.show();
}

function activate(context) {
    const config = new config_1.Config();
    const comb = new comb_1.Comb();
    const onCommand = vscode.commands.registerTextEditorCommand('csscomb.execute', (textEditor) => {
        config.scan().then((preset) => {
            comb.use(textEditor.document, textEditor.selection, preset).then((result) => {
                textEditor.edit((editBuilder) => {
                    editBuilder.replace(result.range, result.css);
                });
            }).catch((err) => {
                showOutput(err.toString());
            });
        });
    });
    const onSave = vscode.workspace.onWillSaveTextDocument((event) => {
        const editorConfiguration = config.getEditorConfiguration();
        if (!editorConfiguration || !editorConfiguration.formatOnSave || !comb.checkSyntax(event.document)) {
            return;
        }
        const edit = config.scan().then((preset) => {
            let excludes = [];
            if (editorConfiguration && editorConfiguration.ignoreFilesOnSave) {
                excludes = excludes.concat(editorConfiguration.ignoreFilesOnSave);
            }
            if (preset && preset.exclude) {
                excludes = excludes.concat(preset.exclude);
            }
            if (excludes.length !== 0) {
                const currentFile = path.relative(vscode.workspace.rootPath, event.document.fileName);
                if (micromatch([currentFile], excludes).length !== 0) {
                    return;
                }
            }
            return comb.use(event.document, null, preset).then((result) => {
                return vscode.TextEdit.replace(result.range, result.css);
            }).catch((err) => {
                showOutput(err.toString());
            });
        });
        event.waitUntil(Promise.all([edit]));
    });
    context.subscriptions.push(onCommand);
    context.subscriptions.push(onSave);
}
exports.activate = activate;