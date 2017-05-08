/**
 * @file 更新音乐列表的json文件
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/5/8
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

module.exports = function (dir, callback) {
    var fs = require('fs');
    const path = require('path');
    var getMusicList = require('./getMusicList');
    getMusicList(dir, function (list) {
        var json = JSON.stringify(list);
        const listFileName = 'musicList.json';
        dir = path.normalize(dir);
        var listFilePath = path.join(dir, listFileName);
        fs.writeFile(listFilePath, json, function (err) {
            callback(err);
        });
    });
};