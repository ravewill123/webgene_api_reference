'use strict';

/**
 * 編譯步驟:
 * 安裝 nodeJS  https://nodejs.org/
 * 安裝 webpack $ npm install webpack -g
 * $ cd /專案目錄
 * $ npm install
 * $ tsd install
 *
 *              測試站發佈: $ npm run dev
 *     測試站發佈 + minify: $ npm run minify
 *         livereload監控: $ npm run watch
 * webpack-dev-server監控: $ npm run serve
 *     正式站發佈 + minify: $ npm run release
 *     
 * 
 * livereload 程式
 * <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
 */

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    del = require('del'); // 跟gulp-clean一樣也是清除檔案，但用法比較簡單

    
var port = 8080;
var webpackConfig = require("./webpack.config.js");
var onError = function(err) {
  console.log(err);      // 詳細錯誤訊息
  $.notify().write(err); // 簡易錯誤訊息
  this.emit('end');      // 中斷程序不往下走
}


///////////////////////////////
// Default task
///////////////////////////////
gulp.task('default', ['copyAll', 'styles'], function() {
    gulp.start(['webpack']);
});

///////////////////////////////
// Server
///////////////////////////////
gulp.task('server', ['copyAll', 'styles'], function() {
    gulp.start(['webpack-dev-server']);
});

///////////////////////////////
// Watch
///////////////////////////////
gulp.task('watch', ['copyAll', 'styles', 'webpack', 'connect'], function() {
  gulp.watch('src/js/**/*', ['webpack']).on('change', function(event) {
    // deleted, changed, added
  });
  gulp.watch('src/template/**/*', ['webpack']);
  gulp.watch('src/asset/**/*', ['copySVG']);
  gulp.watch('src/img/**/*', ['copyImg']);
  gulp.watch('src/js/vendor/**/*', ['copyVendor']);
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/*', ['webpack']);
});

// livereload
gulp.task('connect', function() {
  $.connect.server({
    root: 'build',
    port: port,
    livereload: {port:35729}
  });
  $.util.log("[livereload]", "http://localhost:"+port+"/");
});

///////////////////////////////
// webpack bundle
///////////////////////////////
gulp.task("webpack", function(callback) {
    // run webpack
    var Config = Object.create(webpackConfig);
    if(process.env.DEPLOY === "1"){
      Config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        // 壓縮js文件等同 webpack -p 但好像快一些
        compress: {
          warnings: false
        }
      }));
    }
    webpack( Config, function(err, stats) {
        if(err) throw new $.util.PluginError("webpack", err);
        $.util.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
        gulp.src(['src/*']).pipe($.connect.reload());
        /* 檢視webpack設定與編譯資源細項時打開 */
        // console.log(stats);
    });
});


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var Config = Object.create(webpackConfig);
    Config.devtool = "eval";
    Config.debug = true;

    var compiler = webpack( Config );
    
    new WebpackDevServer(compiler, {
        publicPath: "/" + Config.output.publicPath,
        stats: {
          colors: true
        }
    }).listen(port, "localhost", function(err) {
        if(err) throw new $.util.PluginError("webpack-dev-server", err);
        // Server listening
        $.util.log("[webpack-dev-server]", "http://localhost:"+port+"/webpack-dev-server/build/");
        // keep the server alive or continue?
        // callback();
    });
});

///////////////////////////////
// Clean
///////////////////////////////
gulp.task('clean', function(callback) {
    del(['build/images', 'build/img']).then(paths => {
        callback();
    });
});
gulp.task('cleanCSS', function(callback) {
    del(['build/css/*.css']).then(paths => {
        callback();
    });
});
// 當發現圖片被快取一直無法更新時執行一下 $ gulp clear
gulp.task('clear', function (done) {
  return $.cache.clearAll(done);
});
///////////////////////////////
// Minify Img & SVG & vendor JS
///////////////////////////////
gulp.task('copyAll', ['copySVG', 'copyImg', 'copyVendor'], function(callback) {
    callback();
});
gulp.task('copySVG', [], function() {
    return gulp.src(['src/asset/**/*'])
    .pipe($.plumber({
        errorHandler: onError
    }))
    .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/asset'))
    .pipe($.connect.reload());
});
gulp.task('copyImg', [], function() {
    return gulp.src(['src/img/**/*'])
    .pipe($.plumber({
        errorHandler: onError
    }))
    .pipe(gulp.dest('build/img')) // imagemin 最佳化圖檔有些圖可能會複製不過去,所以先 clone 一份到 img 防止漏圖
    .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'))
    .pipe($.connect.reload());
});
gulp.task('copyVendor', [], function() {
    return gulp.src(['src/js/vendor/**/*'])
    .pipe($.plumber({
        errorHandler: onError
    }))
    .pipe(gulp.dest('build/js/vendor'))
    .pipe($.connect.reload());
});


///////////////////////////////
// Build Styles
///////////////////////////////
gulp.task('styles', ['cleanCSS'], function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe($.plumber({
        errorHandler: onError
    }))
    .pipe($.compass({
      // config_file: './config.rb',
      css: './build/css',
      sass: './src/sass',
      image: './src/img'
    }))
    .pipe($.autoprefixer({
            browsers: ['> 5%'],
            cascade: false
    }))
    .pipe( process.env.DEPLOY === "1" ? $.minifyCss() : $.util.noop() )
    .pipe(gulp.dest('build/css'))
    //.pipe($.notify({ message: 'Styles task complete' }))
    .pipe($.connect.reload());
});
