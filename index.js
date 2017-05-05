/**
 * @file 主入口
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/5/4
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

var getMusicData = require('./lib/getMusicData');
var getMusicList = require('./lib/getMusicList');
const util = require('util');

/*getMusicData('./test_music/Sleep Away.mp3', function (metadata) {

    // for debug
    console.log(util.inspect(metadata, {showHidden: false, depth: null}));
});*/

getMusicList('./test_music/', function (list) {

    // for debug
    console.log(util.inspect(list, {showHidden: false, depth: null}));
});
