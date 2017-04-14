'use strict';
const fs = require("fs");
const fs_1 = require("../utils/fs");
function timeOut() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}
exports.timeOut = timeOut;
function removeFile(filepath) {
    return fs_1.fileExist(filepath).then((exists) => {
        if (!exists) {
            return;
        }
        return new Promise((resolve, reject) => {
            fs.unlink(filepath, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}
exports.removeFile = removeFile;
function writeFile(filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
exports.writeFile = writeFile;
