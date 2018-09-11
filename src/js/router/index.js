require(['page', 'config'], function(page, config) {
    // /index
    page('*', config.start);

    page('/', '/index');

    page('/index', config.index);

    page('/detail', config.detail);

    page('*', config.script);

    page(); //开启路由
})