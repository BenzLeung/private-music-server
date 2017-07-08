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

var musicDir = './music';

function testMusicData() {
    var getMusicData = require('./lib/getMusicData');

    getMusicData('./music/musicList.json', function (metadata) {
        console.log(util.inspect(metadata, {showHidden: false, depth: null}));
    });
}

function testMusicList() {
    var getMusicList = require('./lib/getMusicList');

    getMusicList(musicDir, function (list) {
        console.log(util.inspect(list, {showHidden: false, depth: null}));
    });
}

function scanFolder() {
    var updateMusicListFile = require('./lib/updateMusicListFile');

    updateMusicListFile(musicDir, function (err) {
        if (err) {
            console.log(util.inspect(err, {showHidden: false, depth: null}));
        } else {
            console.log('success!');
        }
    });
}

function initMusicPath(callback) {
    var path = require('path');
    var fs = require('fs');
    fs.readFile(path.join(__dirname, './musicPath.cfg'), 'utf8', function (err, data) {
        if (err) {
            const readline = require('readline');

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Where is your music? (e.g. "D:\\My Music") ', function (answer) {
                musicDir = path.join(__dirname, answer);
                rl.close();
                fs.writeFileSync(path.join(__dirname, './musicPath.cfg'), musicDir, 'utf8');
                callback(musicDir);
            });
        } else {
            musicDir = data;
            callback(musicDir);
        }
    });
}

function startServer() {
    var initServer = require('./lib/initServer');
    initMusicPath(function (p) {
        initServer.setMusicDir(p);
        initServer.init();
    });
}

function main(arg) {
    var cmd = 'start';
    if (arg.length) {
        cmd = arg[0];
    }
    switch (cmd) {
        case 'scan':
            scanFolder();
            break;
        case 'test-metadata':
            testMusicData();
            break;
        case 'start':
        default:
            startServer();
    }
}

main(process.argv.slice(2));
