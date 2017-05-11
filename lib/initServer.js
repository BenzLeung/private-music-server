/**
 * @file 初始化服务器
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/5/9
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

var express = require('express');
var app = express();

const path = require('path');
var getMusicList = require('./getMusicList');

var musicDir = './music';
//var webDir = './public';

var init = function () {
    app.get('/', function (request, response) {
        console.log('Got request /.');
        response.send('My music repository');
    });

    app.get('/getMusicList', function (request, response) {
        var f = path.join(path.normalize(musicDir), 'musicList.json');
        console.log('Got request /getMusicList. f=' + f);
        response.sendFile(f, {
            headers: {
                'content-type': 'application/json'
            }
        });
    });

    app.get('/getMusicFile', function (request, response) {
        var filename = request.query['filename'];
        console.log('Got request /getMusicList, filename=' + filename);
        var f = path.join(path.normalize(musicDir), filename);
        response.sendFile(f, {});
    });

    app.listen(32767);
    console.log('Listening port 32767.');
};


module.exports = {
    setMusicDir: function (dir) {
        musicDir = dir;
    },

    init: init
};
