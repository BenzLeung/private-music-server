/**
 * @file 取出一个音乐的所有资料
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/5/4
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

module.exports = function (file, callback) {
    var fs = require('fs');
    var mm = require('music-metadata');

    var audioStream = fs.createReadStream(file);

    mm.parseStream(audioStream, {native: true}, function (err, metadata) {
        audioStream.close();
        if (err) {
            callback(null);
        }

        metadata['file'] = file;

        callback(metadata);
    });
};
