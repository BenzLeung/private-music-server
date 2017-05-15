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
const jsesc = require('jsesc');
var getMusicData = require('./getMusicData');

var musicDir = './music';
//var webDir = './public';

var init = function () {
    app.get('/', function (request, response) {
        console.log('Got request /.');
        response.send('My music repository');
    });

    app.get('/getMusicList', function (request, response) {
        var f = path.join(path.normalize(musicDir), 'musicList.json');
        console.log(
            'Got request "/getMusicList" from %ip%.'
                .replace('%ip%', request['ip'])
        );
        response.sendFile(f, {
            headers: {
                'content-type': 'application/json'
            }
        });
    });

    app.get('/getMusicFile', function (request, response) {
        var filename = request.query['filename'];
        console.log(
            'Got request /getMusicFile from %ip%, filename=%filename%'
                .replace('%ip%', request['ip'])
                .replace('%filename%', filename)
        );
        var f = path.join(path.normalize(musicDir), filename);
        response.sendFile(f, {});
    });

    app.get('/getMusicData', function (request, response) {
        var filename = request.query['filename'];
        console.log(
            'Got request /getMusicData from %ip%, filename=%filename%'
                .replace('%ip%', request['ip'])
                .replace('%filename%', filename)
        );
        var f = path.join(path.normalize(musicDir), filename);
        getMusicData(f, function (data) {
            if (data) {
                var d = {
                    title: data['common']['title'] || data['file'],
                    artist: data['common']['artist'] || '',
                    album: data['common']['album'] || '',
                    format: data['format']['dataformat'],
                    bitrate: data['format']['bitrate'],
                    duration: data['format']['duration'],
                    filename: data['file'],
                    filesize: data['filesize'],
                    cover: '', // data['common']['picture'][0]['data'].toString('base64'),
                    lrc: '' // data[data['format']['headerType']]['TXXX:LYRICS'][0]
                };
                if (data['common']['picture'] && data['common']['picture'][0] && data['common']['picture'][0]['data']) {
                    // 补全base64格式，假定图片只用jpg、gif、png
                    var imgFormat = data['common']['picture'][0]['format'];
                    if (imgFormat === 'jpg' || imgFormat === 'jpe') {
                        imgFormat = 'jpeg';
                    }
                    d['cover'] = 'data:image/' + imgFormat + ';base64,' + data['common']['picture'][0]['data'].toString('base64');
                }
                if (data['format']['headerType']) {
                    var headerType = data['format']['headerType'];
                    if (data[headerType] && data[headerType]['TXXX:LYRICS'] && data[headerType]['TXXX:LYRICS'][0]) {
                        d['lrc'] = data[headerType]['TXXX:LYRICS'][0]
                    }
                }

                var json = jsesc(d, {
                    'json': true
                });
                response.type('json');
                response.send(json);
            } else {
                response.sendStatus(404);
            }
        });
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
