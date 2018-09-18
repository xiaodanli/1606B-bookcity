define(['jquery', 'get'], function($, get) {
    var config = {};

    config.start = function(ctx, next) { // /index
        console.log(ctx);
        ctx.data = {};
        next();
    }

    var _wrap = $('.wrap');

    config.index = function(ctx, next) {
        get('/view/index.html').then(function(res) {
            _wrap.html(res);
            ctx.data.script = 'index';
            ctx.data.api= ['/api/index','/api/loadmore'];
            console.log('index/index', ctx);
            next();
        }).catch(function(error){
            console.warn(error);
        })
    }

    config.detail = function(ctx, next) {
        get('/view/detail.html').then(function(res) {
            _wrap.html(res);
            ctx.data.script = 'detail';
            ctx.data.fiction_id = ctx.params.fiction_id;
            ctx.data.api = '/api/detail?fiction_id='+ctx.params.fiction_id;
            console.log('detail/detail', ctx);
            next();
        }).catch(function(error){
            console.warn(error);
        })
    }

    config.search = function(ctx,next){
        get('/view/search.html').then(function(res){
            _wrap.html(res);
            ctx.data.script = 'search';
            ctx.data.api = {};
            ctx.data.api.hotkey = '/api/hotkey';
            ctx.data.api.search = '/api/search';
            next();
        }).catch(function(error){
            console.warn(error);
        })
    }

    config.chapter = function(ctx,next){
        get('/view/chapter.html').then(function(res){
            _wrap.html(res);
            ctx.data.script = 'chapter';
            ctx.data.fiction_id = ctx.params.fiction_id;
            ctx.data.chapter_id = ctx.params.chapter_id;
            ctx.data.api= '/api/chapter?fiction_id='+ctx.params.fiction_id;
            next();
        }).catch(function(error){
            console.warn(error);
        })
    }

    config.artical = function(ctx,next){
        get('/view/artical.html').then(function(res){
            _wrap.html(res);
            console.log(ctx);
            ctx.data.script = 'artical';
            ctx.data.fiction_id =  ctx.params.fiction_id;
            ctx.data.chapter_id = ctx.params.chapter_id;
            ctx.data.chapterList = '/api/chapter?fiction_id='+ctx.params.fiction_id;
            ctx.data.articalUrl = '/api/articalurl';
            next();
        }).catch(function(error){
            console.warn(error);
        })
    }

    config.login = function(ctx,next){
        get('/view/login.html').then(function(res){
            _wrap.html(res);
            ctx.data.script = 'login';
            ctx.data.api = '/api/login';
            next();
        }).catch(function(error){
            console.warn(error)
        })
    }

    config.my = function(ctx,next){
        get('/view/my.html').then(function(res){
            _wrap.html(res);
        }).catch(function(error){
            console.warn(error)
        })
    }

    config.script = function(ctx) {
        console.log('script/index', ctx);
        require([ctx.data.script], function(cb) {
            cb(ctx.data);
        })
    }

    return config
})