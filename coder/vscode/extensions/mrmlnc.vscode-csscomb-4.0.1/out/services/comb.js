'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const vscode = require("vscode");
const detectIndent = require("detect-indent");
const config_1 = require("./config");
class Comb {
    constructor() {
        this.config = new config_1.Config();
    }
    use(document, selection, preset) {
        return __awaiter(this, void 0, void 0, function* () {
            this.document = document;
            this.selection = selection;
            this.preset = preset;
            this.settings = this.config.getEditorConfiguration();
            if (!this.checkSyntax(this.document) && !this.settings.supportEmbeddedStyles) {
                throw new Error('Cannot execute CSScomb because there is not style files. Supported: LESS, SCSS, SASS and CSS.');
            }
            this.requireCore();
            if (this.preset === 'syntaxError') {
                vscode.window.showErrorMessage('Provided JSON file contains syntax errors!');
                this.preset = {};
            }
            if (!this.preset) {
                this.preset = {};
            }
            if (typeof this.preset === 'string') {
                this.preset = this.combConstructor.getConfig(this.preset);
            }
            const comb = new this.combConstructor();
            comb.configure(this.preset);
            this.syntax = this.document.languageId;
            if (/sass/.test(this.syntax)) {
                this.syntax = 'sass';
            }
            const content = this.getTextAndRange();
            try {
                let result = yield comb.processString(content.text, { syntax: this.syntax });
                if (content.embeddedRange && this.settings.supportEmbeddedStyles && Object.keys(this.preset).length !== 0) {
                    result = result.split('\n').map((x, index) => {
                        if (index !== 0 && x !== '') {
                            return content.embeddedRange.indent + x;
                        }
                        return x;
                    }).join('\n');
                }
                return Promise.resolve({
                    css: result,
                    range: content.range
                });
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    checkSyntax(document) {
        return /(css|less|scss|sass)/.test(document.languageId);
    }
    requireCore() {
        let moduleVersion = 'csscomb';
        if (this.settings.useLatestCore) {
            moduleVersion += '-next';
        }
        if (moduleVersion !== this.combVersion) {
            this.combConstructor = require(moduleVersion);
            this.combVersion = moduleVersion;
        }
    }
    getTextAndRange() {
        let embeddedRange;
        let range;
        let text;
        if (this.syntax === 'html' && this.settings.supportEmbeddedStyles) {
            embeddedRange = this.searchEmbeddedStyles();
            if (embeddedRange) {
                range = embeddedRange.range;
                text = this.document.getText(range);
                this.syntax = 'css';
            }
        }
        else if (!this.selection || (this.selection && this.selection.isEmpty)) {
            const lastLine = this.document.lineAt(this.document.lineCount - 1);
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(this.document.lineCount - 1, lastLine.text.length);
            range = new vscode.Range(start, end);
            text = this.document.getText();
        }
        else {
            range = new vscode.Range(this.selection.start, this.selection.end);
            text = this.document.getText(range);
        }
        return {
            text,
            range,
            embeddedRange
        };
    }
    searchEmbeddedStyles() {
        if (this.document.languageId !== 'html') {
            return null;
        }
        const text = this.document.getText();
        const startTag = text.indexOf('<style>');
        const endTag = text.indexOf('</style>');
        if (startTag === -1 || endTag === -1) {
            return null;
        }
        let indent = '';
        let indentNumber = 0;
        let pos = startTag - 1;
        while (text[pos] !== '\n') {
            indent += text[pos];
            indentNumber++;
            pos--;
        }
        indent += detectIndent(text).indent;
        return {
            indent,
            range: new vscode.Range(this.document.positionAt(startTag + 8), this.document.positionAt(endTag - indentNumber))
        };
    }
}
exports.Comb = Comb;
