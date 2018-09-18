var gulp = require('gulp');

var server = require('gulp-webserver');

var url = require('url');

var fs = require('fs');

var path = require('path');

var mock = require('./mock');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');

var querystring = require('querystring');

var clean = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var userlist = require('./mock/data/userlist.json');

var babel = require('gulp-babel');

function serverFun(pathurl){
    return gulp.src(pathurl)
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    res.end('');
                    return
                }

                console.log(req.url);

                //   /index   /detail  /my  /  =====> index.html

                //  .js  .css .html  /  /
                if(pathname === '/api/login'){
                    var arr = [];
                    req.on('data',function(chunk){
                        arr.push(chunk);
                    })
                    req.on('end',function(){
                        var params = querystring.parse(Buffer.concat(arr).toString());
                        console.log(params);
                        var isHas = userlist.some(function(item){
                            return item.username == params.username && item.pwd == params.pwd
                        });
                        if(isHas){
                            res.end(JSON.stringify({code:1,msg:'登录成功'}));
                        }else{
                            res.end(JSON.stringify({code:0,msg:'登录失败'}));
                        }
                    })
                }else if (/^\/api/.test(pathname)) {

                    // /api/index  /api/detail

                    /*
                        function(url) {
                            return obj[url]
                        }
                    */
                    res.end(JSON.stringify({ code: 1, data: mock(req.url) }))
                } else {
                    // pathname = pathname === '/' ? '/index.html' : pathname;
                    pathname = /\.js|\.css|\.html|\.jpg|\.png$/.test(pathname) ? pathname : '/index.html';
                    res.end(fs.readFileSync(path.join(__dirname,pathurl, pathname)))
                }
            }
        }))
}

gulp.task('devServer', function() {
    return  serverFun('src')
})

//开发环境编译sass
gulp.task('devCss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./src/css'))
})

//监听

gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('devCss'))
})

//开发环境
gulp.task('dev', gulp.series('devCss', 'devServer', 'watch'));

//线上环境

//压缩css
gulp.task('buildCss',function(){
    return gulp.src('./src/css/all.css')
    .pipe(clean())
    .pipe(gulp.dest('build/css'))
})

//
gulp.task('copyCss',function(){
    return gulp.src('./src/css/swiper-3.4.2.min.css')
    .pipe(gulp.dest('build/css'))
})

gulp.task('copyImg',function(){
    return gulp.src('./src/imgs/*')
    .pipe(gulp.dest('build/imgs'))
})

gulp.task('uglify',function(){
    return gulp.src('./src/js/{common,viewjs,router}/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
})

gulp.task('copyJs',function(){
    return gulp.src(['./src/js/**/*.js','!./src/js/{common,viewjs,router}/*.js'])
    .pipe(gulp.dest('build/js'))
})


gulp.task('copyHtml',function(){
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('build'))
})

gulp.task('buildServer', function() {
    return  serverFun('build')
})

gulp.task('build',gulp.series('buildCss','copyCss','copyImg','uglify','copyJs','copyHtml'))

