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
    const jsesc = require('jsesc');
    var getMusicList = require('./getMusicList');
    getMusicList(dir, function (list) {
        var json = jsesc(list, {
            'json': true
        });
        var jsonp = 'getMusicList(' + json + ')';
        const listFileName = 'musicList.json';
        dir = path.normalize(dir);
        var listFilePath = path.join(dir, listFileName);
        fs.writeFile(listFilePath, jsonp, function (err) {
            callback(err);
        });
    });
};
