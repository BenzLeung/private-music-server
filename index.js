/**
 * @file 主入口
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/5/4
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

const util = require('util');

const musicDir = 'D:\\Benc\\Music\\iPhone Music';

function testMusicData() {
    var getMusicData = require('./lib/getMusicData');

    getMusicData('./music/Sleep Away.mp3', function (metadata) {
        console.log(util.inspect(metadata, {showHidden: false, depth: null}));
    });
}

function testMusicList() {
    var getMusicList = require('./lib/getMusicList');

    getMusicList(musicDir, function (list) {
        console.log(util.inspect(list, {showHidden: false, depth: null}));
    });
}

function testMusicListToJsonFile() {
    var updateMusicListFile = require('./lib/updateMusicListFile');

    updateMusicListFile(musicDir, function (err) {
        if (err) {
            console.log(util.inspect(err, {showHidden: false, depth: null}));
        } else {
            console.log('success!');
        }
    });
}

function startServer() {
    var initServer = require('./lib/initServer');
    initServer.setMusicDir(musicDir);
    initServer.init();
}

startServer();