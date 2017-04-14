'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require("path");
const os = require("os");
const vscode = require("vscode");
const fs_1 = require("../utils/fs");
class Config {
    constructor() {
        this.builtConfigs = ['csscomb', 'yandex', 'zen'];
        this.home = os.homedir();
        this.root = vscode.workspace.rootPath;
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            const editorConfig = yield this.getConfigFromEditor();
            if (editorConfig && Object.keys(editorConfig).length !== 0) {
                return editorConfig;
            }
            const workspaceConfig = yield this.getConfigFromWorkspace();
            if (workspaceConfig) {
                return workspaceConfig;
            }
            const globalConfig = yield this.getConfigFromUser();
            if (globalConfig) {
                return globalConfig;
            }
            return {};
        });
    }
    getEditorConfiguration() {
        return vscode.workspace.getConfiguration().get('csscomb');
    }
    readConfigurationFile(filepath) {
        return fs_1.fileRead(filepath).then((content) => {
            try {
                return JSON.parse(content);
            }
            catch (err) {
                return 'syntaxError';
            }
        });
    }
    getConfigFromEditor() {
        const config = this.getEditorConfiguration();
        if (typeof config.preset !== 'string') {
            return Promise.resolve(config.preset);
        }
        if (typeof config.preset === 'string' && this.builtConfigs.indexOf(config.preset) !== -1) {
            return Promise.resolve(config.preset);
        }
        let filepath = config.preset;
        if (config.preset.startsWith('~')) {
            filepath = config.preset.replace(/^~($|\/|\\)/, `${this.home}$1`);
        }
        if (this.root && (config.preset.startsWith('./') || config.preset.startsWith('../'))) {
            filepath = path.resolve(this.root, config.preset);
        }
        return this.readConfigurationFile(filepath);
    }
    getConfigFromWorkspace() {
        return vscode.workspace.findFiles('**/*csscomb.json', '**/node_modules/**').then((matches) => {
            if (!Array.isArray(matches) || (matches && matches.length === 0)) {
                return null;
            }
            return this.readConfigurationFile(matches[0].fsPath);
        });
    }
    getConfigFromUser() {
        const filepathWithoutDot = path.join(this.home, 'csscomb.json');
        const filepathWithDot = path.join(this.home, '.csscomb.json');
        return Promise.all([
            fs_1.fileExist(filepathWithoutDot),
            fs_1.fileExist(filepathWithDot)
        ]).then((result) => {
            if (!result[0] && !result[1]) {
                return null;
            }
            const filepath = result[0] ? filepathWithoutDot : filepathWithDot;
            return this.readConfigurationFile(filepath);
        });
    }
}
exports.Config = Config;
