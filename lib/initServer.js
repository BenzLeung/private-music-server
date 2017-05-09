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
var webDir = './public';

app.get('/getMusicList', function (request, response) {
    var f = path.join(path.normalize(musicDir), 'musicList.json');
    response.sendFile(f);
});

