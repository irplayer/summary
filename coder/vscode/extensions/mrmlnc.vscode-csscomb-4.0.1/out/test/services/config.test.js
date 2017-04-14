'use strict';
const assert = require("assert");
const os = require("os");
const path = require("path");
const utils_1 = require("../utils");
const config_1 = require("../../services/config");
const config = new config_1.Config();
const fixtures = path.join(__dirname, '../../../fixtures');
const workspaceSettings = path.join(fixtures, '.vscode/settings.json');
const workspaceConfig = path.join(fixtures, '.csscomb.json');
const globalConfig = path.join(os.homedir(), 'csscomb.json');
function removeConfigs() {
    return Promise.all([
        utils_1.removeFile(workspaceSettings),
        utils_1.removeFile(workspaceConfig),
        utils_1.removeFile(globalConfig)
    ]);
}
suite('Services/Config', () => {
    test('Editor settings', () => {
        const settingsString = JSON.stringify({
            'csscomb.preset': {
                'color-case': 'lower'
            }
        });
        return removeConfigs()
            .then(() => utils_1.writeFile(workspaceSettings, settingsString))
            .then(() => utils_1.timeOut())
            .then(() => config.scan())
            .then((preset) => {
            assert.deepEqual(preset, {
                'color-case': 'lower'
            });
        });
    });
    test('Editor Settings with filepath', () => {
        const settingsString = JSON.stringify({
            'csscomb.preset': './test.json'
        });
        return removeConfigs()
            .then(() => utils_1.writeFile(workspaceSettings, settingsString))
            .then(() => utils_1.timeOut())
            .then(() => config.scan())
            .then((preset) => {
            assert.deepEqual(preset, {
                'color-case': 'upper',
                'file': true
            });
        });
    });
    test('Workspace config', () => {
        const settingsString = JSON.stringify({
            'color-case': 'upper',
            'workspace': true
        });
        return removeConfigs()
            .then(() => utils_1.writeFile(workspaceConfig, settingsString))
            .then(() => utils_1.timeOut())
            .then(() => config.scan())
            .then((preset) => {
            assert.deepEqual(preset, {
                'color-case': 'upper',
                'workspace': true
            });
        });
    });
    test('Global config', () => {
        const settingsString = JSON.stringify({
            'color-case': 'upper',
            'global': true
        });
        return removeConfigs()
            .then(() => utils_1.writeFile(globalConfig, settingsString))
            .then(() => utils_1.timeOut())
            .then(() => config.scan())
            .then((preset) => {
            assert.deepEqual(preset, {
                'color-case': 'upper',
                'global': true
            });
        });
    });
    test('Null config', () => {
        return removeConfigs()
            .then(() => utils_1.timeOut())
            .then(() => config.scan())
            .then((preset) => {
            assert.deepEqual(preset, {});
        });
    });
});
