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
            ctx.data.api = '/api/index';
            console.log('index/index', ctx);
            next();
        })
    }

    config.detail = function(ctx, next) {
        get('/view/detail.html').then(function(res) {
            $('.wrap').html(res);
            ctx.data.script = 'detail';
            console.log('detail/detail', ctx);
            next();
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