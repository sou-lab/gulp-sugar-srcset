'use strict';
const through = require('through2');
const gutil = require('gulp-util');

const options = require('./options');
const main = require('./main');

module.exports = (opts = {}) => {
  opts = options(opts);

  return through.obj((file, enc, cb) => {
    if (file.isNull()){
      cb(null, file);
      return;
    }

    if (file.isStream()){
      cb(new gutil.PluginError('gulp-sugar-srcset', 'Streaming not supported'));
      return;
    }

    try {
      file.contents = new Buffer(main(file.contents.toString(), opts));
    } catch (e) {
      cb(new gutil.PluginError('gulp-sugar-srcset', e));
      return;
    }

    cb(null, file);
  });
};
