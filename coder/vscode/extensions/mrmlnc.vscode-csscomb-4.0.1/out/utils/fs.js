'use strict';
const fs = require("fs");
function fileExist(filepath) {
    return new Promise((resolve) => {
        fs.access(filepath, (err) => {
            resolve(!err);
        });
    });
}
exports.fileExist = fileExist;
function fileStat(filepath) {
    return new Promise((resolve, reject) => {
        fs.stat(filepath, (err, stat) => {
            if (err) {
                return reject(err);
            }
            resolve(stat);
        });
    });
}
exports.fileStat = fileStat;
function fileRead(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, file) => {
            if (err) {
                return reject(err);
            }
            resolve(file.toString());
        });
    });
}
exports.fileRead = fileRead;
