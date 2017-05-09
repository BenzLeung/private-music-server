/**
 * @file 遍历指定目录，获得音乐列表
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/5/4
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

module.exports = function (dir, callback) {
    var fs = require('fs');
    const path = require('path');
    var getMusicData = require('./getMusicData');

    var musicList = [];

    dir = path.normalize(dir);

    fs.readdir(dir, function (err, files) {
        var p;
        var i, len = files.length;
        var musicCount = len;
        var isFinish = false;
        for (i = 0; i < len; i ++) {
            p = path.join(dir, files[i]);
            getMusicData(p, function (data) {
                if (data) {
                    var d = {
                        title: data['common']['title'],
                        artist: data['common']['artist'],
                        album: data['common']['album'],
                        format: data['format']['dataformat'],
                        bitrate: data['format']['bitrate'],
                        duration: data['format']['duration'],
                        filename: data['file'],
                        filesize: data['filesize']
                    };
                    musicList.push(d);
                } else {
                    musicCount --;
                }
                if (musicList.length >= musicCount && !isFinish) {
                    isFinish = true;
                    callback(musicList);
                }
            });

        }
    });
};
