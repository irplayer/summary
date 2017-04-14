'use strict';
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const utils_1 = require("../utils");
const config_1 = require("../../services/config");
const comb_1 = require("../../services/comb");
const config = new config_1.Config();
const fixtures = path.join(__dirname, '../../../fixtures');
const workspaceSettings = path.join(fixtures, '.vscode/settings.json');
suite('Services/Comb', () => {
    const comb = new comb_1.Comb();
    test('Should work', () => {
        const settingsString = JSON.stringify({
            'csscomb.preset': {
                'color-case': 'upper'
            }
        });
        return utils_1.removeFile(workspaceSettings)
            .then(() => utils_1.writeFile(workspaceSettings, settingsString))
            .then(() => utils_1.timeOut())
            .then(() => config.scan())
            .then((preset) => {
            return vscode.workspace.openTextDocument(path.join(fixtures, './css/test.css')).then((res) => {
                return comb.use(res, null, preset);
            });
        })
            .then((result) => {
            assert.ok(/#FFF/.test(result.css));
        });
    });
    test('Should work with HTML', () => {
        const settingsString = JSON.stringify({
            'csscomb.supportEmbeddedStyles': true,
            'csscomb.preset': {
                'color-case': 'upper'
            }
        });
        return utils_1.removeFile(workspaceSettings)
            .then(() => utils_1.writeFile(workspaceSettings, settingsString))
            .then(() => utils_1.timeOut())
            .then(() => config.scan())
            .then((preset) => {
            return vscode.workspace.openTextDocument(path.join(fixtures, './html/test.html')).then((res) => {
                return comb.use(res, null, preset);
            });
        })
            .then((result) => {
            assert.ok(/#E5E5E5/.test(result.css));
        });
    });
});
