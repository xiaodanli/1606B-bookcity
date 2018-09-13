define(['jquery', 'get'], function($, get) {
    var config = {};

    config.start = function(ctx, next) { // /index
        console.log(ctx);
        ctx.data = {};
        next();
    }

    config.index = function(ctx, next) {
        get('/view/index.html').then(function(res) {
            $('.wrap').html(res);
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
            $('.wrap').html(res);
            ctx.data.script = 'detail';
            ctx.data.api = '/api/detail';
            console.log('detail/detail', ctx);
            next();
        }).catch(function(error){
            console.warn(error);
        })
    }

    config.search = function(ctx,next){
        get('/view/search.html').then(function(res){
            $('.wrap').html(res);
            ctx.data.script = 'search';
            ctx.data.api = {};
            ctx.data.api.hotkey = '/api/hotkey';
            ctx.data.api.search = '/api/search';
            next();
        }).catch(function(error){
            console.warn(error);
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